import WorksectionMember from '../models/worksectionMembers.model.js'


/* esquema de seccion */
class WorksectionMemberRepository{


    async create (user_id, worksection_id, rol){
     return await WorksectionMemberRepository.create
        ({
            fk_worksection_id: worksection_id,
            fk_user_id: user_id,
            rol: rol
         })
    };

    async getById(member_id){
        return await WorksectionMemberRepository.findById(member_id)
    };

    async updateById(member_id, update_data){
        return await WorksectionMemberRepository.findByAndUpdate(member_id, update_data)
    };
    
    async deleteById(member_id){
        return await WorksectionMemberRepository.findByIdAndDelete(member_id)
    };
        /* buscar usuario y seccion por id*/
      async getByUserAndWorsectionId(user_id, worksection_id){
        const membership = await WorksectionMember.findOne({
            fk_user_id: user_id,
            fk_worksection_id: worksection_id
        })
        return membership
    }

}

export default WorksectionMemberRepository