import mongoose from 'mongoose'

/* Modelos de seccion de trabajo - sala  */
const worksectionSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    docente: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true },
    descripcion: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: true
    }

})

export const WORKSECTION_COLLECTION_NAME = 'worksection'
const Worksection = mongoose.model
(WORKSECTION_COLLECTION_NAME, worksectionSchema);

export default Worksection