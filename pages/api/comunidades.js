import { SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response){
    
    if(request.method === 'POST'){
        const TOKEN = '0b8a66b01aa209103c77673ed982a0'

        const client = new SiteClient(TOKEN);
        
        const registroCriado = await client.items.create({
            itemType : "971590", //Id do modelo no Dato
            ...request.body,
            // title : "comunidade de teste",
            // imageUrl : "https://cdn.icon-icons.com/icons2/1582/PNG/512/instagram_108043.png",
            // creatorSlug : 'RafaelN0bre' ,

        })

        console.log(registroCriado)

        response.json({
            dados : 'ALGUM DADO QUALQUER',
            registroCriado : registroCriado,
        })

        return;

    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
    

}