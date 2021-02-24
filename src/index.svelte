<div id="main">
    <div id="gjs">
        <h1>Hello World Component!</h1>
    </div>
</div>

<script>
import { onMount } from 'svelte';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from "grapesjs";

onMount(() => {
    const editor = grapesjs.init({
        container: '#gjs',
        fromElement: true,
        storageManager: false
    });
});
</script>

<style>
    #main {
        position: absolute;
        display: inline;
        min-width: 100%;
        min-height: 100%;
    }
</style>