<script  lang="ts" setup="">
    import {useStore} from "vuex";

    const store = useStore()
    const loginAction = ()=>store.dispatch('getRequestToken')

</script>

<template>
 <div>
   <button @click="loginAction">login</button>
 </div>
</template>