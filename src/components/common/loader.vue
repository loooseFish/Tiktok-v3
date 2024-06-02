<template>
    <div class="loader"></div>
</template>

<script setup>

</script>


<style scoped lang="less">
// ----------------------------------------------------------------
:root {
    --textSize: (16 / @rootsize);
}

@rootsize: 3.75vw;

.dispalyFlex(@position, @row) {
    display: flex;
    justify-content: space-evenly;
    align-items: @position;
    flex-direction: @row;
}

.after() {
    content: '';
    display: inline-block;
    position: absolute;
}

// ----------------------------------------------------------------

.loader {
    position: absolute;
    margin-top: (5 / @rootsize);

    width: (30 / @rootsize);
    height: (30 / @rootsize);
    animation: rotation 1s linear infinite;
}

.loader::after,
.loader::before {
    content: "";
    position: absolute;
    width: (15 / @rootsize);
    height: (15 / @rootsize);
    top: 50%;
    left: 50%;
    border-radius: 50%;
    animation: animloader 1s ease-in-out infinite;
}

.loader::after {
    background-color: #FD3E59;
    transform: scale(0.5) translate(0, 0);
}

.loader::before {
    background-color: #67F1E8;
    transform: scale(0.5) translate(-200%, -200%);
}

@keyframes animloader {
    50% {
        transform: scale(1) translate(-50%, -50%);
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}

@keyframes Ncolor {
    0% {
        color: #67F1E8;
    }

    50% {
        color: #FD3E59;
    }

    100% {
        color: #67F1E8;
    }
}
</style>
