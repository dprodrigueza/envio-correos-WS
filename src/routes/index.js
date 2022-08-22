const {Router} = require('express');
const nodemailer = require ('nodemailer');
const cors = require("cors");
const router = Router();

router.use(cors());

router.post('/notificar',async (req, res) =>{
try{

    let data = req.body;
    //console.log(data)

    if (data === null){
        //console.log('entro al if');
        return  res.status(400).json({
            ok: false,
            err: {
                message: 'No hay datos'
            }
        });
    }else{
        console.log("objeto",data)
        let correo = data.correo
        let nombreTramite = data.nombreTramite
        let numero = data.numero
        let asunto = data.asunto
        let autor = data.autor
        let fecha = data.fecha
        let descripcion = data.descripcion
        let logo = data.logo
        let attachments = data.attachments


        contentMail= `<!doctype html>
        <head>
        <link rel="stylesheet" href="./style.css">
        </head>

        <body>
        <div id="email___content">
        <img src="${logo}" alt="" width="50" height="40">
        <h2>${nombreTramite} # ${numero}: ${asunto}</h2>
        <p>AUTOR: ${autor}</p>
        <p>FECHA: ${fecha}</p>
        <p>${descripcion}</p>
        </div>
        </body>
        </html>
        `;
        //console.log("cuerpo", contentMail)

        const mail = {
            user: 'info@gmail.com'
        }
        console.log(mail.user)
        let transporter = nodemailer.createTransport({
            host: "mail.smtp.com",
            port: 587,
            tls: {
                secure: false,
                ignoreTLS: true,
                rejectUnauthorized: false
            },
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'info@gmail.com', // generated ethereal user
                pass: 'toppassword' // generated ethereal password
            },
        });
        let message ={
            from: `"Empresa " <${mail.user}>`, // sender address
            to: correo, // list of receivers
            subject: "Notificación",
            text: "Trámite Creado Exitosamente", // plain text body
            html: contentMail,
            attachments: attachments
        }
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return process.exit(1);
            }
    
            console.log('Message sent successfully!');
            console.log(nodemailer.getTestMessageUrl(info));
    
            // only needed when using pooled connections
            transporter.close();
        });
        console.log("transporter",transporter)
    }
    res.status(200).json({
        ok: true
    });

}catch (error) {
        return res.status(400).json({
            ok: false,
            err: {
                message: error
            }
        });
    }
});

module.exports = router;