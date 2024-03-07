<template>
  <div>
    <h1>Login</h1>
    <button @click="login('admin')">
        Login As admin
    </button>
    <button @click="login('editor')">
        Login As Viewer

    </button>
    <button @click="login('editor')">
        Login As Editor

    </button>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
export default {
    name:'Login',
    methods:{
        login(role){
            let token;
            switch(role){
                case 'admin':
                    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4ifQ.29eLEIGd2z128wIMmHaMfmN-OeZn2YYJEE6fuxgjmBI'
                    break;
                case 'viewer':
                    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVklFV0VSIn0.b-E62N_bUomNZwlqal8LqNHLDU6V577d9AKEl0C5NWs'
                    break;
                case 'editor':
                    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiRURJVE9SIn0.oh3VcQOKj6Fm_DSdTD6APLnTUf1E7rvw2GS_tP2yRVs'
                    break;
            }

            localStorage.setItem('token',token);

            const decoded=jwtDecode(token);
            this.redirectUser(decoded.role);


            
        }
    }
}
</script>

<style>

</style>