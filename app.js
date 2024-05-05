const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')





const flujoCurriculum = addKeyword(['Curriculum', 'Curriculums', 'Currículum'])
    .addAnswer('👉 Este es el link que te redirecciona hacia su curriculum', null, async (ctx, { flowDynamic }) => {

        const linkGeneration = () => 'https://drive.google.com/file/d/1a64eId5ssrCEV0Plkro8exU9FRaF4mpU/view?usp=sharing';

        await flowDynamic([{ body: `${linkGeneration()}` }])


    });

const flujoGithub = addKeyword(['Github', 'Resitorio Github', 'github'])
    .addAnswer('🏆 Para visualizar los repositorios te invito a que visites nuestra url', null, async (ctx, { flowDynamic }) => {

        linkGeneration = () => 'https://github.com/AnsonyRoja'


        await flowDynamic([{ body: `${linkGeneration()}` }])


    })

const flujoLinkedin = addKeyword(['Linkedin', 'Linkedi', 'Linkedins'])
    .addAnswer('🧍‍♂️ Para visualizar el perfil de linkedin de Ansony, Espere un momento', null, async (ctx, { flowDynamic }) => {

        linkGeneration = () => 'https://www.linkedin.com/in/ansony-rojas-dev/'


        await flowDynamic([{ body: `${linkGeneration()}` }])


    })

const flujoPrincipal = addKeyword(['hola', 'hols', 'buenos dias', 'buenas tardes', 'buenas noches'])
    .addAnswer(['👨‍💼 Soy el asistente personal de Ansony. Estoy aquí para ayudarte a acceder a toda la información y a su 👨‍🎓currículum profesional',
        ' ¡Solo dime lo que necesitas y estaré encantado de ayudarte!'])
    .addAnswer(['Estas son las opciones:', '• *Curriculum*', '• *Github*', '• *Linkedin*'], { capture: true }, async (ctx, { fallBack, flowDynamic }) => {
        const respuestaUsuario = ctx.body.toLowerCase();
        let timeoutID = 0;


        if (!respuestaUsuario.includes('curriculum', 'Curriculum', 'Currículum', 'Github', 'Linkedin')) {

            timeoutID = setTimeout(() => {

                return fallBack('');
            }, 3500);


        }

        await new Promise(resolve => setTimeout(resolve, 3000)); // Esperar 3 segundos

        // Si no hay flujo dinámico, simplemente continuar con el flujo principal
        if (!flowDynamic) {
            clearTimeout(timeoutID);
            return;

        }

        // Esperar a que se complete el flujo dinámico
        await flowDynamic();


    }, [flujoCurriculum, flujoGithub, flujoLinkedin])


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
