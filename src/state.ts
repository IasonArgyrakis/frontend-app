import {createGlobalState} from 'react-hooks-global-state';
import {backend} from "./services/data.service";
import {createData} from "./components/departments";



export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    afm: string;
    email: string;
}

export interface IDepartment {
    id: number;
    title: string;
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



