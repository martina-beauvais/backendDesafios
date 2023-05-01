import nodemailer from 'nodemailer';

const GMAIL_PSW = 'wujabngdfpqotdma';
const GMAIL_USER = 'marbeauvais17@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure : false,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PSW
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})

const sendEmail = async (to, subject, message, attachment) => {
    try {
        const from = GMAIL_USER;
        const mailInfo = {
            from,
            to,
            subject,
            html: message,
            attachments: attachment ? [{ path: attachment }] : []
        };
        const info = await transporter.sendMail(mailInfo);
        console.log(`Envío de email: ${JSON.stringify(info)}`);
    } catch (error) {
        console.error(error);
    }
};

const nuevoRegistro = userData => {
    const { email, firstName, lastName, edad, direccion, telefono, avatar } = userData;
    return `
        <h1>Nuevo usuario registrado</h1>
        </br>
        <h3> Email: </h3> 
            <p>${email}</p>
        <h3> Nombre y apellido: </h3>
            <td>${firstName} ${lastName}</td>
        <h3> Edad: </h3>
            <p>${edad}</p>
        <h3> Dirección: </h3>
            <p> ${direccion}</p>
        <h3>Teléfono:</h3>
            <p>${telefono}</p>
        <h3>Avatar:</h3>
            <p>${avatar}</p>`;
};

const nuevoPedido = (orderData, type) => {
    const { numero, email, firstName, timestamp, direccion, telefono, status, total, productos } = orderData;
    const title = type == "admin" ? "Nueva órden de pedido" : "¡Estamos procesando tu pedido!";
    let html = `
        <div>
            <h1>${title}</h1>
            <p><b>N°: ${numero.toString().padStart(6, "0")}</b></p>
            <p><b>Fecha: </b>${new Date(timestamp).toLocaleString()}</p>
            ${type == "admin" ? `<p><b>Usuario: </b>${email}</p>` : ""}
            ${type == "admin" ? `<p><b>Nombre: </b>${firstName}</p>` : ""}
            <p><b>Domicilio: </b>${direccion}</p>
            <p><b>Teléfono: </b>${telefono}</p>
            <p><i><b>ESTADO: </b>${status}</i></p>
            <table style="border-collapse:collapse;"
        </div>`;
    if (type == "admin") {
        html += `
        <thead>
            <tr style="background-color:#d3d3d3;">
                <th>#id</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>
        </thead>`;
    }
    html += `
            <tbody>`;
    for (const item of productos) {
        html += `
              <tr>
                ${type == "admin"
                ? `<td style="border-bottom:1px solid black;padding-right:8px;"><p>${item.producto.id}</p></td>`
                : ""
            }
                <td style="border-bottom:1px solid black;">
                  <p>${item.producto.title}</p>
                </td>
                <td style="padding:0 16px;border-bottom:1px solid black;">${item.quantity
            }x</td>
                <td style="border-bottom:1px solid black;text-align:right;"><b>$${formatoPrecio(
                item.producto.price
            )}</b></td>
              </tr>`;
    }
    html += `
              <tr style="background-color:#add8e6;">
                <td colspan="${type == "admin" ? 3 : 2}">
                  <h3>TOTAL</h3>
                </td>
                <td style="text-align:right;"><h3>$${formatoPrecio(total)}</h3></td>
              </tr>
            </tbody>
          </table>
          ${type != "admin"
            ? `<br><h2 style="color:#b30404;">¡Muchas gracias por tu compra!</h2>`
            : ""
        }
        </div>`;
    return html;
};

export default { sendEmail, nuevoRegistro, nuevoPedido };