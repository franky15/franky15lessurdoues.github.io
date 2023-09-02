import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { GetAllPersonnels, GetOnePersonnels, AddPersonnels, UpdatePersonnels } from "../../pages/Admin/personnels"  //"@/pages/Admin/personnels"
import {GetAllUtilisateurs, GetOneUtilisateurs, AddUtilisateurs, UpdateUtilisateurs } from "../../pages/Admin/utilisateurs"  //"@/pages/Admin/utilisateurs"
import { GetAllClasses, GetOneClasse, AddClasse, UpadeteClasse } from "../../pages/Admin/classes"  //"@/pages/Admin/classes"
import {GetAllEleves, GetOneEleve, CreateEleve, UpdateEleve, GetAllClassesEleves, GetOneClasseEleves } from "../../components/eleves"  //"@/components/eleves"
import { GetAllEntree, GetOneEntree, CreateOneEntree, ComptaDetail   } from '../../pages/Admin/Compta'; //'@/pages/Admin/Compta';
import { GetAllComptaCharges, GetOneComptaCharge, CreateOneComptaCharge  } from "../../pages/Admin/comptaCharges";

//import { Dashboard } from "@/pages/Admin"
import { Dashboard } from "../../pages/Admin"


//import Error from '@/_utils/Error';
import Error from '../../_utils/Error';



const AdminRouter = () => {

    return (

        <Routes>
            
            
            
                <Route index element={ <Dashboard/> }/>
                
                <Route path='users'>
                    <Route index element={ <GetAllUtilisateurs/> }/>
                    <Route path='getall' element={ <GetAllUtilisateurs/> }/>
                    <Route path='getone/:id' element={ <GetOneUtilisateurs/> }/>
                    <Route path='add' element={ <AddUtilisateurs/> }/>
                    <Route path='update/:id' element={ <UpdateUtilisateurs/> }/>
                    <Route path='*' element = { <Error/> }/> 
                </Route>

                <Route path='personnels'>
                    <Route index element={ <GetAllPersonnels/> }/>
                    <Route path='getall' element={ <GetAllPersonnels/> }/>
                    <Route path='getone/:id' element={ <GetOnePersonnels/> }/>
                    <Route path='add' element={ <AddPersonnels/> }/>
                    <Route path='update/:id' element={ <UpdatePersonnels/> }/>
                    <Route path='*' element = { <Error/> }/> 
                </Route>

                <Route path='compta'>


                    <Route index element={ <GetAllEntree/> } /> 
                    <Route path='getall' element={ <GetAllEntree/> } /> 
                    <Route path='add' element={ <CreateOneEntree/> } /> 
                    <Route path='getone/:id' element={ <GetOneEntree/> } />
                    <Route path='detail' element={ <ComptaDetail /> } /> 
                    <Route path='*' element = { <Error/> }/> 
                </Route>

                <Route path='comptaCharges'>


                    <Route index element={ <GetAllComptaCharges/> } /> 
                    <Route path='getall' element={ <GetAllComptaCharges/> } /> 
                    <Route path='add' element={ <CreateOneComptaCharge/> } /> 
                    <Route path='getone/:id' element={ <GetOneComptaCharge /> } />
                   
                    <Route path='*' element = { <Error/> }/> 
                </Route>

                <Route path='classes'>
                   
                        <Route index element={ <Dashboard/> }/>

                        <Route path='dashboard' element={ <Dashboard/> }/>
                        <Route path='getall' element={ <GetAllClasses/> }/>
                        <Route path='getone/:id' element={ <GetOneClasse/> }/>
                        <Route path='add' element={ <AddClasse/> }/>
                        <Route path='update/:id' element={ <UpadeteClasse/> }/>
                    
                        <Route path='*' element = { <Error/> }/> 
                   
                </Route>

                <Route path='eleves'>
                   
                   <Route index element={ <GetAllEleves/> }/>

                   <Route path='getall' element={ <GetAllEleves/> }/> 
                   <Route path='getone/:id' element={ <GetOneEleve/> }/>
                   <Route path='add' element={ <CreateEleve/> }/>
                   <Route path='update/:id' element={ <UpdateEleve/> }/>

                   <Route path='getallclasseseleve' element={ <GetAllClassesEleves/> }/> 
                   <Route path='getallclasseseleve/:id' element={ <GetOneClasseEleves/> }/> 
               
                   <Route path='*' element = { <Error/> }/> 
              
           </Route>

                <Route path='*' element = { <Error/> }/> 

           

        </Routes>
  
    );
};

export default AdminRouter;

//<Route element= { <AdminLayout/>}/>