<template>
  <section class="container mt-4">

    <h1 class="text-center">Cofiguración</h1>

    <div  v-if="mostrarmsg"
          class='alert alert-success mt-5 text-center'>
      <p>{{ encontrado ? 'Encontrado' : 'No fue posible llegar al estado objetivo' }}</p>
    </div>

    <form class="row mt-4 justify-content-center">

      <div class="row col-sm-12 col-lg-6 mt-3">
        <label for="inputEmail3" class="col-sm-4 col-form-label">Estado Inicial</label>
        <div class="col-sm-8">
          <input v-model="estado_inicial" placeholder="A, B, C" type="text" class="form-control" id="inputEmail3">
        </div>
      </div>

      <div class="row col-sm-12 col-lg-6 mt-3">
        <label for="inputEmail3" class="col-sm-4 col-form-label">Objetivo</label>
        <div class="col-sm-8">
          <input v-model="objetivo" placeholder="D, E" type="text" class="form-control" id="inputEmail3">
        </div>
      </div>

    </form>

    <hr>

    <h3 class="text-center">Reglas</h3>
    <form class="row mt-4 justify-content-center">
      <div class="row col-sm-12 col-lg-6 mt-3">
        
        <label class="col-sm-2 col-form-label">Regla</label>
        <div class="col-8 col-sm-6">
          <input v-model="nueva_regla" placeholder="A, B => C" type="text" class="form-control" id="inputEmail3">
        </div>
        <button class="btn btn-primary  col-md-2" style="max-width: 80px;"  v-on:click.prevent="addRegla()">Agregar</button>

      </div>
    </form>

    <h5 class="mx-3 mt-4">Listado de reglas</h5>
    <ul class="mx-5">
      <li v-for="regla of reglas" :key='regla'>{{[...regla.requirement]}} => {{[...regla.result]}}</li>
    </ul>
    
    <div class="row col-12 justify-content-center mt-2">
        <button class="btn btn-info col-4 " v-on:click.prevent="cargarEjemplo()">Cargar ejemplo</button>
    </div>

    <div class="row col-12 justify-content-center my-2">
        <button class="btn btn-primary col-4 " v-on:click.prevent="calcular()">Probar</button>
    </div>

  </section>
</template>

<script>
import Parser from '../helpers/Parser';

export default {
  data: function (){
    return {
      estado_inicial: '',
      objetivo: '',
      nueva_regla: '',
      reglas: [],
      mostrarmsg: false,
      encontrado: false,
    }
  },
  methods: {
    addRegla(){
      this.mostrarmsg = false
      let regla = this.nueva_regla.replaceAll(' ', '')
      let [req, res] = regla.split('=>')
      this.reglas.push({
        requirement: new Set(req.split(',')),
        result: new Set(res.split(','))
      })
      this.nueva_regla = ''
    },
    calcular(){
      let ei = new Set(this.estado_inicial.replaceAll(' ', '').split(','))
      let o = new Set(this.objetivo.replaceAll(' ', '').split(','))
      let p = new Parser(this.reglas, ei, o)
      console.log(this.reglas);
      this.mostrarmsg = true
      this.encontrado = p.run()
    },
    cargarEjemplo(){
      this.estado_inicial = 'S, L'
      this.objetivo = 'H'
      this.reglas = [
        {
            requirement : new Set(['P', 'L']),
            result: new Set(['T'])
        },
        {
            requirement : new Set(['S', 'T']),
            result: new Set(['C'])
        },
        {
            requirement : new Set(['S']),
            result: new Set(['N'])
        },
        {
            requirement : new Set(['L', 'N']),
            result: new Set(['F'])
        },
        {
            requirement : new Set(['F']),
            result: new Set(['G'])
        },
        {
            requirement : new Set(['C']),
            result: new Set(['G'])
        },
        {
            requirement : new Set(['G']),
            result: new Set(['H'])
        }
      ]

    }
  }
}
</script>

<style>

</style>