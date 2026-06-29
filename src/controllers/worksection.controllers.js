import { MEMBER_WORKSECTION_ROL } from '../const/memberRoles.const.js'; //  CORRECTO
import ServerError from '../helpers/serverError.helper.js';
import worksectionRepository from '../repositories/worksection.repository.js';
import WorksectionMemberRepository from '../repositories/worksectionMember.repository.js';

/* logica de programacion */ 
/* revisar  class */
class workSectionController {
    
    post = async (request, response) => {
        try {
            const body = request.body;
            
            if (!body.nombre || !body.email) {
                throw new ServerError("El nombre de Usuario y el gmail son obligatorios", 400);
            }
            
            if (!body.password) {
                throw new ServerError("La contraseña es obligatoria", 400);
            }
            
            
            const new_section = await section_repository.create({
                nombre: body.nombre,
                email: body.email,
                password: body.password
            });
            
            return response.status(201).send({
                ok: true,
                message: "Sala creada",
                data: {
                    new_section: new_section
                }
            });
        } 
        catch (error) {
            if (error instanceof ServerError) {
                return response.status(error.status).send({
                    ok: false,
                    message: error.message 
                });
            } else {
                console.error("Error crítico en section:", error);
                return response.status(500).send({
                    ok: false,
                    message: "Error interno del servidor"
                });
            }
        }
    };
    getAllByUserId = async (request, response) => {
        try {
            return response.status(200).json({ ok: true, msg: "Secciones obtenidas" });
        } catch (error) {
            return response.status(500).json({ ok: false, error: error.message });
        }
    };
};
export default new workSectionController();

/* revisar */



/* 
busco todos los miembros donde este el id del usuario. por cada resultado de la lista del find , quiero expandir la propiedad fk_worksection_id seleccionando las propiedades nombre,descripcion y estado
async getByUserId(user_id){
    const memberships = await worksectionMember
    .find ({ fk_user_id: user_id })
    .populate (
        path: 'fk_worksection_id',
        select:'nombre descripcion estado'),
        match: {estado: true}
};
return memberships => ({
    .filter(
        membership => membership.fk_worksection_id
    )
    .map(membership => ({
        member_id: membership._id,
        member_rol: membership.rol,
        member_fecha_union: membership.fecha_creacion,
        worksection_id: membership.fk_worksection_id._id,
        worksection_nombre: membership.fk_worksection_id.nombre,
        worksection_descripcion: membership.fk_worksection_id.descripcion 
    })

    )
})

*/

