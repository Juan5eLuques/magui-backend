import mongoose from 'mongoose';
import {WORKSECTION_COLLECTION_NAME} from './worksection.model.js';
import {USER_COLLECTION_NAME} from './user.model.js';
import {MEMBER_WORKSECTION_ROL} from '../const/memberRoles.const.js'; 


/* Esquema/modelo de las secciones de trabajo - salas */

const worksectionMembersSchema   = new mongoose.Schema({
    fk_workrooms_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: WORKSECTION_COLLECTION_NAME
    },

    fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: USER_COLLECTION_NAME
    },

    rol: {
        enum: 
        [MEMBER_WORKSECTION_ROL.ADMIN, 
            MEMBER_WORKSECTION_ROL.DIRECTOR,
            MEMBER_WORKSECTION_ROL.DOCENTE,
            MEMBER_WORKSECTION_ROL.OTHER_STAFF],
        type: String,
        default: MEMBER_WORKSECTION_ROL 
    },
    
    fecha_creacion: {
        type: Date,
        default: Date.now,
        required: true
    }

})
/* no me reconoce los roles */
export const WORKSECTION_MEMBER_MODEL = 'WorksectionMember';


const WorksectionMember = mongoose.model(WORKSECTION_MEMBER_MODEL, worksectionMembersSchema);

export default WorksectionMember;