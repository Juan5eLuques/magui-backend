import ServerError from "../helpers/serverError.helper.js";
import Worksection from "../models/worksection.model.js";
import WorksectionMember from "../models/worksectionMembers.model.js";
import worksectionRepository from "../repositories/worksection.repository.js";
import WorksectionMemberRepository from "../repositories/worksectionMember.repository.js";
import { MEMBER_WORKSECTION_ROL } from "../const/memberRoles.const.js";

class workSectionMiddleware {
    async create (request, response) {
        try {
            const { nombre, descripcion } = request.body;
            
            const user_id = request.user.id; 

            if (!nombre || nombre.trim() === '') {
                throw new ServerError("El nombre de la Seccion es obligatoria", 400);
            }

            const newWorksection = await worksectionRepository.create(
                nombre, 
                descripcion || '' 
            );

          await worksectionMemberRepository.create(
                user_id, 
                newWorksection.id, 
                MEMBER_WORKSECTION_ROL["DOCENTE"] 
            );

            return response.status(201).json({
                ok: true,
                message: "¡La seccion fue creada!",
                data: {
                    worksection: newWorksection
                }
            });

        } catch (error) {
            if (error instanceof ServerError) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message
                });
            } else {
                console.error("Error en WorksectionController:", error);
                return response.status(500).json({
                    ok: false,
                    message: "Error interno del servidor"
                });
            }
        }
    }

    async getAllByUser(request, response) {
        try {
            const user_id = request.user.id;

            const worksection = await worksectionMemberRepository.getByUserId(user_id);

            return response.status(200).json({
                ok: true,
                message: "Secciones obtenidas",
                data: { 
                    worksection 
                }
            });
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(500).json({ ok: false, message: "Error interno" });
            }
            console.error(error);
        }
    }

     async deleteById(request, response) {
        try{
            const worksection_id = request.params.worksection_id

            const deleted_worksection = await worksectionRepository.softDeleteById(worksection_id)

            return response.status(200).json({
                message: "Seccion eliminada",
                ok: true,
                status: 200,
                data: {
                    worksection: deleted_worksection
                }
            });

        }catch(error){
            if (error instanceof ServerError) {
                return response.status(error.status).json(
                    {
                        message: error.message,
                        ok: false,
                        status: error.status
                    }
                )
            }
            else {
                console.error('Error critico:', error);
                return response.status(500).json({
                    message: "Error interno del servidor",
                    ok: false,
                    status: 500
                });
            }
        }
    }
    async updateById(request, response) {
        try{
            const worksection_id = request.params.worksection_id
            const {nombre, descripcion} = request.body
            
            const updated_info = {}
            
            if(!nombre && !descripcion){
                throw new ServerError("Enviar al menos un campo para actualizar", 400)
            }
            if(nombre){
                if(nombre.length < 2){
                    throw new ServerError("El nombre debe tener al menos 2 caracteres", 400)
                }
                updated_info.nombre = nombre
            }

            if(descripcion){
                updated_info.descripcion = descripcion
            }
            const updated_worksection = await worksectionRepository.updateById(worksection_id, updated_info)

            const worksection_after_update = await worksectionRepository.getById(worksection_id)
            return response.status(200).json({
                message: "Seccion actualizada",
                ok: true,
                status: 200,
                data: {
                    worksection: worksection_after_update
                }
            });


        }catch(error){
            if (error instanceof ServerError) {
                return response.status(error.status).json(
                    {
                        message: error.message,
                        ok: false,
                        status: error.status
                    }
                )
            }
            else {
                console.error('Error critico:', error);
                return response.status(500).json({
                    message: "Error interno del servidor",
                    ok: false,
                    status: 500
                });
            }
        }
    }
};


async function worksection_Middleware(request, response, next) {
    try{
        const user_id = request.user.id
        const worksection_id = request.params.worksection_id

        if (!worksection_id) {
            throw new ServerError("El id de la seccion es obligatorio", 400)
        }

        const worksection = await worksectionRepository.getById(worksection_id)
        if (!worksection) {
            throw new ServerError("No se encontro la seccion ", 404)
        }

    
        const member_selected = await worksectionMemberRepository.getByUserAndWorksectionId(user_id, worksection_id)

        if (!member_selected) {
            throw new ServerError("No sos miembro de esta seccion", 403)
        }

        request.worksection = worksection
        request.membership = member_selected

        return next()

    }catch (error) {
        if (error instanceof ServerError) {
            return response.status(error.status).json(
                {
                    message: error.message,
                    ok: false,
                    status: error.status
                }
                )
            }
            else {
                    console.error('Error critico:', error);
                    return response.status(500).json({
                        message: "Error interno del servidor",
                        ok: false,
                        status: 500
                    });
            }
    
    }
} 


export { workSectionMiddleware, worksection_Middleware}