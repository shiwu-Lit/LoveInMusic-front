<script setup>
import ScoreItem from "@/components/scores/ScoreItem.vue";
import {object} from "yup";

defineProps({
  scoreList: { type: object}
});
</script>

<template>

  <div class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 mt-5">
    <div class="col mb-3" v-for="score in scoreList" :key="score.id">
      <ScoreItem :score="score"/>
    </div>
  </div>
</template>
