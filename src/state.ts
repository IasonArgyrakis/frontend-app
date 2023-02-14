import {createGlobalState} from 'react-hooks-global-state';
import {backend} from "./services/data.service";
import {createData} from "./components/departments";



export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    afm: string;
    email: string;
    departments:Array<any>
}

export interface IDepartment {
    id: number;
    title: string;
    users?:Array<IUser>
}
const users: IUser[] = []
let departments: IDepartment[] = []

export const {useGlobalState} = createGlobalState({
    departments:departments,
    users: users,
});

// export const reducerDepartments = (state, action) => {
//     switch (action.type) {
//         case 'increment': return { ...state, count: state.count + 1 };
//         case 'decrement': return { ...state, count: state.count - 1 };
//         default: return state;
//     }
// };

export const reducerUsers = (users:IUser[], action: { type: any; user: IUser; }) => {
    switch (action.type) {
        case 'update': return { ...users, users: updateModel(action.user,users) };
        default: return users;
    }
};


function updateModel(model:any,models:any){
    const modelIndex=models.findIndex((element: { id: any; })=>element.id === model.id)
    models[modelIndex]=model
    return modelIndex
}



