<template>
    <div class="wrapper">
        <div class="header">
        Drag and Select
        </div>
        <div class="content" v-drag-select="{ getSelectedItems: handleSelectedFolders }">
            <div v-for="(item,index) in pokemons" :key="index" class="item selectable"  :data-id="item">
                <img :src="require(`../assets/${item}.png`)" :alt="item" height="60%" width="60%"/>
                <label>{{ item }}</label>
            </div>
        </div>
        <div class="footer">
         Selected Pockmons are
         <div>
         <span v-for="(pokemon,index) in selected" :key="index">
            {{ pokemon }}
         </span>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PokemonBoard',
    data(){
        return{
            pokemons:[
                'Absol',
                'Articuno',
                'Balbasaur',
                'Butterfree',
                'Charizard',
                'Dragonair',
                'Dragonite',
                'Herdier',
                'Lapras',
                'Moltres',
                'Octillery',
                'Persian',
                'Pikachu',
                'Squirtle',
                
            ],
            selected:[]
        }
    },
    methods:{
        handleSelectedFolders(selectedPokemons){
            this.selected = selectedPokemons
        }
    }

}
</script>

<style>
@import "./styles.css";
</style>