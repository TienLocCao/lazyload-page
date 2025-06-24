import type { Component } from 'vue'
import HomeIcon from './HomeIcon.vue'

interface Icons {
  home: Component
  // Add other icons here as needed
}

export const icons: Icons = {
  home: HomeIcon
}
