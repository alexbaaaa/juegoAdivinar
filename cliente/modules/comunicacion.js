class Comunicacion{
    constructor (url, port, ui){
        this.operaciones = {

        }
        this.messages = {
            enviar: [],
            recibir: []

        }
        this.ws = new WebSocket('ws://'+url+':'+port);
        this.conectado = false;
        this.ws.onopen = (event) => {
            this.conectado = true;
            ui.listo();
        };
        this.onmessage = (event) => {
            try {
                let msg = JSON.parse(event.data);
                if(msg.hasOwnProperty('estado')){
                    let content = this.messages.recibir.find((elemnt) => elemnt.estado = msg.estado);
                    content.campos.forEach(element => {
                        if(!msg.hasOwnProperty(element)){
                            throw new SyntaxError("Faltan campos");
                        }
                        content.accion(msg);
                    });
                }else {
                    throw new SyntaxError("Fallo en el parseo");
                }
            }catch (e) {
                console.log(e);
            }
        };
        this.ws.onerror = (event) => {
            this.conectado = false;
        }
        this.ws.onclose = (event) => {
            this.conectado = false;
        }
        }
        
    isConectado () {
        return this.conectado;
    }
    comenzar () {
        let content = this.messages.enviar.find((elemnt) => elemnt.estado == this.operaciones.EMPEZAR)
        this.ws.send(JOSN.stringfy(content));
    }
    sendNumber (num) {
        let content = this.messages.enviar.find((elemnt) => elemnt.estado == this.operaciones.NUMERO)
        content.valor = num;
        this.ws.send(JOSN.stringfy(content));
    }

}
export {Comunicacion};