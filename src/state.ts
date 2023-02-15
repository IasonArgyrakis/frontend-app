import {createGlobalState} from 'react-hooks-global-state';


export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    password?:string
    afm: string;
    email: string;
    departments:Array<IDepartment>
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

export const reducerDepartments =  (departments:IDepartment[], action: { type: any; department: IDepartment; }) => {
  switch (action.type) {
        case 'add':
            addModel(action.department,departments)
            return {  departments };
        case 'update': return { ...departments, departments: updateModel(action.department,departments) };
        case 'remove': return { ...departments, departments: deleteModel(action.department,departments) };
        default: return departments;
    }
};

export const reducerUsers = (users:IUser[], action: { type: any; user: IUser; }) => {
    switch (action.type) {
        case 'update': return { ...users, users: updateModel(action.user,users) };
        case 'remove': return { ...users, users: deleteModel(action.user,users) };
        default: return users;
    }
};
function addModel(model:any,models:any){
    models.push(model)
    return [...models]
}

function updateModel(model:any,models:any){
    const modelIndex=models.findIndex((element: { id: any; })=>element.id === model.id)
    models[modelIndex]=model
    return modelIndex
}
function deleteModel(model:any,models:Array<any>){
    const modelIndex=models.findIndex((element: { id: any; })=>element.id === model.id)
    models.splice(modelIndex)
    return modelIndex
}



