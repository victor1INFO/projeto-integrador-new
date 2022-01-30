<template>

<v-app>
<img src="https://icones.pro/wp-content/uploads/2021/03/symbole-de-voiture-icone-png-vert.png" alt="" height="200" width="200">
<nav class="titule"><b>Control Park</b></nav>
  <!-- Adicionar -->  
  <nav class="titule2">Adicionar</nav>
  <v-card
          :elevation="hover ? 24 : 6"
          class="mx-auto pa-6"
        >
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="formsite"
  >
    <v-text-field
      v-model="placaVeiculo"
      :counter="8"
      label="Placa"
      required
    ></v-text-field>

    <v-text-field
      v-model="horarioVeiculo"
      :counter="5"
      label="Horário"
      required
    ></v-text-field>
    
    <v-text-field
      v-model="dateVeiculo"
      :counter="10"
      label="Data"
      required
    ></v-text-field>



    <v-btn
      :disabled="!valid"
      color="green darken-2"
      class="mr-4"
      @click="salvarFire()"
    >
      <v-icon>mdi-apple-keyboard-caps</v-icon>
    </v-btn>

  </v-form>
  </v-card>
  <!-- Adicionar Fim -->  
  <!-- Gerenciamento -->
<nav class="titule3">Gerenciamento</nav>
  <v-card
          :elevation="hover ? 24 : 6"
          class="mx-auto pa-6 tabletasks"
        >
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Placa
          </th>
          <th class="text-left">
            Horario
          </th>
          <th class="text-left">
            Dia
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="carro of carros"
          :key="carro.id"
        >
          <td>{{ carro.placa }}</td>
          <td>{{ carro.hora }}</td>
          <td>{{ carro.dia }}</td>
        
          <td><v-icon @click="deleteCar(carros, carro.id)" >mdi-arrow-right-bold-outline</v-icon></td>
          
          

        </tr>
    </tbody>
    </template>
  </v-simple-table>
  </v-card>    
  <!-- Gerenciamento Fim -->
  <!-- Historico -->
 <nav class="titule3">Histórico</nav>
  <v-card
          :elevation="hover ? 24 : 6"
          class="mx-auto pa-6 tabletasks"
        >
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Placa
          </th>
          <th class="text-left">
            Horario
          </th>
          <th class="text-left">
            Dia
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="carroht of carrosht"
          :key="carroht.id"
        >
          <td>{{ carroht.placaht }}</td>
          <td>{{ carroht.horaht }}</td>
          <td>{{ carroht.diaht }}</td>
        
          <td><v-icon @click="deleteCarht(carrosht, carroht.id)">mdi-close-thick</v-icon></td>
          
          

        </tr>
    </tbody>
    </template>
  </v-simple-table>
  </v-card>  
  <!-- Historico Fim-->
  <nav class="subtitule">By Victor - Adelar -2info3</nav>
  
      


 </v-app> 
</template>
<script>

import * as fb from '@/plugins/firebase'
import { doc, deleteDoc } from "firebase/firestore";
export default {

  data(){
    return{
      placaVeiculo: '',
      horarioVeiculo: '',
      dateVeiculo: '',
      uid:'',
      carros: [],
      carrosht: [],

      

    }
  },
  mounted() {
    this.buscarCarros();
    this.buscarCarrosHt();
    

  },
  methods: {
    async salvarFire() {
            await fb.htCollection.add({
            placaht: this.placaVeiculo,
            horaht: this.horarioVeiculo,
            diaht: this.dateVeiculo,
            }),
            this.buscarCarrosHt(); 
            
            
            await fb.grCollection.add({
            placa: this.placaVeiculo,
            hora: this.horarioVeiculo,
            dia: this.dateVeiculo,
            }),
            this.buscarCarros();
           
            this.$refs.form.reset()
            
            
          }, 
          async buscarCarros() {
            this.carros = [];
            const logTasks = await fb.grCollection.get();
          for (const doc of logTasks.docs) {
              this.carros.push({
                id: doc.id,
                placa: doc.data().placa,
                hora: doc.data().hora,
                dia: doc.data().dia,

                
                })
              }
            },
          async buscarCarrosHt() {
            this.carrosht = [];
            const logTasks = await fb.htCollection.get();
          for (const doc of logTasks.docs) {
              this.carrosht.push({
                id: doc.id,
                placaht: doc.data().placaht,
                horaht: doc.data().horaht,
                diaht: doc.data().diaht,

                
                })
              }
            },
            async deleteCar(carros, id) {
            const v = this.carros.indexOf(carros)
            this.carros.splice(v, 1)
            await deleteDoc(doc(fb.grCollection, id));
            

          },
            async deleteCarht(carrosht, id) {
            var r=confirm("Deseja excluir?");
            if (r==true){
            const v = this.carrosht.indexOf(carrosht)
            this.carrosht.splice(v, 1)
            await deleteDoc(doc(fb.htCollection, id));
            }
            else{
              document.location.reload(true);
            }

          },  
    

    
    }
}
</script>

<style>
.titule{
  margin: auto;
  margin-bottom:50px;
  margin-top: 10px;
  font-family: Trebuchet MS, sans-serif;
  font-size: 60px;
  color: green;
  
  
}
.formsite{
  text-align: center;
}
.tabletasks{
  margin-bottom: 40px;
}

img{
  margin: auto;
  margin-top: 10px;
  margin-bottom: 1px;
}
.titule2{
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  font-family: Trebuchet MS, sans-serif;
  font-size: 50px;
  color: black;

}
.titule3{
  margin: auto;
  margin-bottom: 10px;
  margin-top: 20px;
  font-family: Trebuchet MS, sans-serif;
  font-size: 50px;
  color: black;
}
.card{
  background-color: grey;
  margin: auto;
  margin-top: 10px;
  border-radius: 5px;
  border-style: solid;
  border-width: 2px;
  border-color: grey;
  width: 400px;
}
.tabela{
  margin: auto;
}
.botao{
  margin-top: 20px;
 text-align: center;
}


</style>    


