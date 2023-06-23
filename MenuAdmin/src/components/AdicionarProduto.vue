<template>
    <div class="main">
        <div class="categorias">
            <select v-model="categorias">
                <option value="">Selecionar</option>
                <option value="lanches">Lanches</option>
                <option value="bebidas">Bebidas</option>
                <option value="porcoes">Porções</option>
                <option value="pizzas">Pizzas</option>
            </select>
            <input class="inputTxt" v-model="produto" type="text" placeholder="Digite o produto...">
            <input class="inputTxt" v-model="ingreditentes" type="text" placeholder="Digite os ingredientes...">
            <input class="inputTxt" v-model="valor" type="text" placeholder="Digite o preço">

            <div class="radio">
                <div class="disponibilidade">
                    <p>
                        Disponível:
                    </p>
                    <input class="inputRadio" type="radio" value="disponivel" v-model="disponibilidade">
                </div>
                <div class="disponibilidade">
                    <p>
                        Indisponível:
                    </p>
                    <input class="inputRadio" type="radio" value="indisponivel" v-model="disponibilidade">
                </div>
            </div>

        </div>
        <button @click="AdicionarProduto">Adicionar</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            categorias: '',
            produto: '',
            ingreditentes: '',
            valor: '',
            disponibilidade: '',
        }
    },
    watch:{
        categorias(newValue){
            console.log(newValue);
        }
    },
    methods: {
        AdicionarProduto() {
            axios.post('http://localhost:8082/produtos', {
                categoria: this.categorias,
                produto: this.produto,
                ingredientes: this.ingreditentes,
                preco: parseFloat(this.valor),
                disponibilidade: this.disponibilidade
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })

            window.location.reload()

        }
    }
}
</script>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
}

.categorias{
    display: flex;
    flex-direction: column;
}

.radio{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

select{
    padding: 20px 0px;
    font-size: 25px;
    text-align: center;
}

button{
    padding: 20px 0px;
    font-size: 25px;
}

.disponibilidade{
    display: flex;
    flex-direction: row;
    width: 30%;
    justify-content: space-evenly;
    margin-top: 15px;
    font-size: 30px;
}

.inputRadio{
    margin-bottom: 15px;
}
.inputTxt{
    padding: 20px 5px;
    font-size: 25px;
}

</style>