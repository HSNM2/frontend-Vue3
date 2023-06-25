<template>
  <div class="relative flex h-full flex-col">
    <h1 class="mb-6 bg-neutral-50 px-8 py-4 text-lg font-semibold text-neutral-800">我的收藏</h1>
    <div class="h-full flex-1 bg-neutral-50 p-8">
      <div class="flex h-full flex-col justify-between">
        <template v-if="courseList.length === 0">
          <div class="m-auto text-center">
            <p class="mb-8 text-lg font-bold text-neutral-800">還沒收藏任何課程喔！</p>
            <router-link to="/courses">
              <button class="btn-primary mr-2">來去逛逛</button>
            </router-link>
          </div>
        </template>
        <template v-if="courseList.length !== 0">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <template v-for="item in courseList" :key="item.id">
              <div class="relative">
                <router-link :to="`/course/${item.id}`">
                  <span
                    class="material-icons absolute right-2 top-2 z-10 cursor-pointer text-2xl text-primary-3"
                    @click.prevent="handleCourseTag(item.id)"
                  >
                    {{ judgeTags(item.id) ? 'bookmark' : 'bookmark_border' }}
                  </span>
                  <div class="cursor-pointer hover:shadow hover:shadow-md hover:shadow-neutral-150">
                    <div class="overflow-hidden">
                      <img
                        class="block h-48 w-full object-cover duration-150 hover:scale-110"
                        :src="item.image_path"
                        alt=""
                      />
                    </div>
                    <div class="h-56 border border-t-0 border-solid border-neutral-150 p-3">
                      <div class="flex h-full flex-col justify-between">
                        <h3 class="line-clamp-2 text-lg font-bold text-primary-6">
                          {{ item.title }}
                        </h3>
                        <div>
                          <span class="text-sm text-neutral-800">{{ item.provider }}</span>
                          <div class="flex items-center">
                            <span class="material-icons pr-2 text-base"> watch_later </span>
                            <span class="text-sm text-neutral-800">{{ item.totalTime }}</span>
                          </div>
                          <div class="flex items-center">
                            <span class="material-icons pr-2 text-base"> person </span>
                            <span class="text-sm text-neutral-800">{{ item.buyers }}</span>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="flex items-center">
                              <template v-for="(star, starIndex) in 5" :key="starIndex">
                                <span class="material-icons text-lg text-primary-3">
                                  {{ getStar(item.avgRating, starIndex) }}
                                </span>
                              </template>
                              <span class="text-sm text-neutral-600">
                                {{ `(${item.countRating})` }}
                              </span>
                            </div>
                          </div>
                          <div class="flex items-center gap-x-2">
                            <span class="text-2xl font-bold text-primary-4"
                              >NT${{ item.price }}</span
                            >
                            <span class="text-sm font-bold text-neutral-400 line-through"
                              >NT${{ item.originPrice }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </template>
          </div>
        </template>
        <div class="mt-8 flex items-center justify-end">
          <div class="border" :class="currentPage - 1 <= 0 ? 'text-neutral-400' : ''">
            <span class="cursor-pointer px-2" @click="setPage(currentPage - 1)">&lt;</span>
          </div>
          <ul class="flex cursor-pointer items-center">
            <li v-for="page in totalPages" :key="page">
              <div class="border" :class="page === currentPage ? 'bg-primary-4 text-white' : ''">
                <span class="px-2" @click="setPage(page)">{{ page }}</span>
              </div>
            </li>
          </ul>
          <div
            class="border"
            :class="currentPage + 1 >= courseList?.totalPages ? 'text-neutral-400' : ''"
          >
            <span class="cursor-pointer px-2" @click="setPage(currentPage + 1)">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useTagStore } from '@/stores/tag'
import { getStar } from '@/composables/userCourse'

const tag = useTagStore()
const { courseList } = storeToRefs(tag)
const { getTagsData, getTagList, handleCourseTag, judgeTags } = tag

const currentPage = ref(1)
const totalPages = ref(1)
const setPage = (page: number) => {
  if (page <= 0 || page >= totalPages.value) return
  currentPage.value = page
}

onMounted(() => {
  getTagsData()
  getTagList()
})
</script>
