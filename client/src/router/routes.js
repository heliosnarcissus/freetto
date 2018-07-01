
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '/timesheet',
        component: () => import('pages/index')
      },
      { path: '/profile',
        component: () => import('pages/profile')
      }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
