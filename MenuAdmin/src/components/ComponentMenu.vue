<template>
    <div>
        <header>
            <img class="sair" src="../assets/sair.png" @click="Sair">
            <h4>
                Skina
            </h4>
        </header>
        <div class="main">
            <div class="sub-header">
                <button class="buttonAdd" @click="RenderAdd">Adicionar +</button>
                <div class="filtros">
                    <p class="text-filtro">
                        Filtrar Categorias:
                    </p>
                    <select v-model="selecionar" @click="AlterarOpcao">
                        <option value="">Selecionar</option>
                        <option value="bebidas">Bebidas</option>
                        <option value="lanches">Lanches</option>
                        <option value="pizzas">Pizzas</option>
                        <option value="porcoes">Porções</option>
                    </select>
                </div>
            </div>

            <div v-if="renderadd" class="render">
                <div class="headerAdd">
                    <img class="close" src="../assets/close.png" @click="close">
                </div>
                <AdicionarProduto/>
            </div>



            <!-- Renderização dos produtos -->


            <div class="elements-select" v-if="selecionar == '' && renderProd">
                <div class="infoProd" v-for="product, i in products" :key="i">
                    <div class="DelandUp">
                        <img class="delup" src="../assets/edit.png" alt="" @click="Edit(product, i)">
                        <img class="delup" src="../assets/delete.png" alt="" @click="Delete(product, i)">
                    </div>
                    <p><span>Categoria: </span>{{ product.categoria }}</p>
                    <p><span>Produto: </span>{{ product.produto }}</p>
                    <p><span>ingredientes: </span>{{ product.ingredientes }}</p>
                    <p><span>Preço: </span>{{ product.preco }}</p>
                    <p><span>Disponibilidade: </span>{{ product.disponibilidade }}</p>
                    <p>{{ product.id }}</p>
                </div>
            </div>
            <div class="elements-select" v-if="selecionar != '' && renderProd">
                <div class="infoProd" v-for="el, i in filters" :key="i">
                    <div class="DelandUp">
                        <img class="delup" src="../assets/edit.png" alt="" @click="Edit(el, i)">
                        <img class="delup" src="../assets/delete.png" alt="" @click="Delete(el, i)">
                    </div>
                    <p><span>Categoria: </span>{{ el.categoria }}</p>
                    <p><span>Produto: </span>{{ el.produto }}</p>
                    <p><span>Ingredientes: </span>{{ el.ingredientes }}</p>
                    <p><span>Preço: </span>{{ el.preco }}</p>
                    <p><span>Disponibilidade: </span>{{ el.disponibilidade }}</p>
                    <p>{{ el.id }}</p>
                </div>
            </div>


            <!-- Renderizar edição -->


            <div class="categorias" v-if="renderedit">
                <select class="selectCategory" v-model="categoriasEdit">
                    <option value="">Selecionar</option>
                    <option value="lanches">Lanches</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="porcoes">Porções</option>
                    <option value="pizzas">Pizzas</option>
                </select>
                <input class="inputTxt" v-model="produtoEdit" type="text" placeholder="Digite o produto...">
                <input class="inputTxt" v-model="ingredientesEdit" type="text" placeholder="Digite os ingredientes...">
                <input class="inputTxt" v-model="valorEdit" type="text" placeholder="Digite o preço">

                <div class="radio">
                    <div class="disponibilidade">
                        <p>
                            Disponível:
                        </p>
                        <input class="inputRadio" type="radio" value="disponivel" v-model="disponibilidadeEdit">
                    </div>
                    <div class="disponibilidade">
                        <p>
                            Indisponível:
                        </p>
                        <input class="inputRadio" type="radio" value="indisponivel" v-model="disponibilidadeEdit">
                    </div>
                </div>
                <div class="buttons">
                    <button class="btnedit" @click="Confirmar">Confirmar</button>
                    <button class="btnedit" @click="Cancelar">Cancelar</button>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import AdicionarProduto from '../components/AdicionarProduto.vue'
import axios from 'axios';
export default{
    data(){
        return{
            renderadd: false,
            renderedit: false,
            renderProd: true,
            products: [],
            filters: [],
            categoria: '',
            produto: '',
            ingredientes: '',
            preco: '',
            disponibilidade: '',
            selecionar: '',

            //Editar

            categoriasEdit: '',
            produtoEdit: '',
            ingredientesEdit: '',
            valorEdit: '',
            disponibilidadeEdit: '',
            idEdit: ''
        }
    },
    components: {
        AdicionarProduto
    },
    watch: {
        selecionar(newValue){
            console.log(newValue);
        }
    },
    created(){
            axios.get("http://localhost:8082/")
            .then((res) => {
                this.products = res.data
                this.products.forEach((a) => {
                    this.categoria = a.categoria
                    this.produto = a.produto
                    this.ingredientes = a.ingredientes
                    this.preco = a.preco
                    this.disponibilidade = a.disponibilidade
                })
            })
            .catch((err) => {
                console.log(err);
            })
    },
    methods: {
        AlterarOpcao(){
            this.filters = []
            this.products.filter((obj) => {
                if (obj.categoria == this.selecionar) {
                    this.filters.push(obj)
                    this.categoria = obj.categoria
                    this.produto = obj.produto
                    this.ingredientes = obj.ingredientes
                    this.preco = obj.preco
                }
            })
        },
        RenderAdd(){
            this.renderProd = false
            this.renderadd = true
        },
        close(){
            this.renderProd = true
            this.renderadd = false
        },
        Sair() {
            localStorage.removeItem('token')
            this.$router.push('/')
        },
        Edit(product, i){
            this.renderedit = true
            this.renderProd = false
            this.idEdit = product.id
            axios.get(`http://localhost:8082/${product.id}`)
            .then((data) => {
                this.categoriasEdit = data.data[0].categoria
                this.produtoEdit = data.data[0].produto
                this.ingredientesEdit = data.data[0].ingredientes
                this.valorEdit = data.data[0].preco
                this.disponibilidadeEdit = data.data[0].disponibilidade
            })
            .catch((err) => {
                console.log(err);
            })
        },
        Delete(product, i){
            axios.delete(`http://localhost:8082/produto/${product.id}`)
            window.location.reload()
        },
        Confirmar() {
            axios.put(`http://localhost:8082/produto/${this.idEdit}`, {
                categoria: this.categoriasEdit,
                produto: this.produtoEdit,
                ingredientes: this.ingredientesEdit,
                preco: this.valorEdit,
                disponibilidade: this.disponibilidadeEdit
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
            window.location.reload()
        },
        Cancelar(){
            this.renderedit = false
            this.renderProd = true
        }
    }
}
</script>

<style scoped>
header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgb(124, 124, 124);
    position: fixed;
    padding: 25px 0;
    width: 100%;
    top: 0;
}

.main{
    margin-top: 150px;
}

h4{
    color: white;
    margin: 0 20px 0 0;
}

span{
    font-weight: bolder;
}

svg{
    width: 40px;
    fill: white;
    margin-left: 20px;
}

.sair{
    width: 50px;
    height: 50px;
    fill: white;
}
.close{
    width: 50px;
    cursor: pointer;
}

.filtros{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 50%;
}

.delup{
    width: 40px;
}
.sub-header{
    width: 80%;
    margin: 50px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-bottom: solid;
    padding-bottom: 15px;
}

.DelandUp{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
}

.render{
    width: 50%;
    margin: 0 auto;
}

.buttonAdd{
    font-weight: bolder;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    background-color: black;
    padding: 10px;
    color: white;
}

select{
    width: 300px;
    font-size: 20px;
    text-align: center;
}

.text-filtro{
    font-size: 30px;
    font-weight: bolder;
}

.elements-select{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.infoProd{
    border: solid;
    width: 400px;
    height: 400px;
    margin: 30px;
    text-align: center;
}

.main{
    display: flex;
    flex-direction: column;
}

.categorias{
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
}

.radio{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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

.selectCategory{
    padding: 20px 0px;
    font-size: 25px;
    text-align: center;
    width: 100%;
}

.btnedit{
    width: 50%;
    padding: 20px 0px;
    font-size: 25px;
}

</style>