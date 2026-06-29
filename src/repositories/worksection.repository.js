import Worksection from '../models/worksection.model.js';

/* clase SecciondeTrabajo ;
 para obtener toda la lista de salas activas*/
class WorksectionRepository {
    async getAll(){
        return await worksection.find(
            {activo:true}
        );
    }

    /* para obtener por id una sala/seccion*/
    async getById(worksection_Id){
        return await worksection.findById(worksection_Id);
    }


    /* para actualizar : update_data para poder pasar datos nuevos*/
    async updateById(worksection_Id, update_data){
        return await worksection.findByIdAndUpdate(worksection_Id, update_data);
    }

/* crear: */
    async create(nombre, descripcion){
        return await Worksection.create
        ({
            nombre,
            descripcion,
        })
    };

}


const worksectionRepository = new WorksectionRepository();
export default worksectionRepository;