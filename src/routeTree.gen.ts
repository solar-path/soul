/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CompanyIndexImport } from './routes/company/index'
import { Route as publicIndexImport } from './routes/(public)/index'
import { Route as publicPricingImport } from './routes/(public)/pricing'
import { Route as CompanySettingsIndexImport } from './routes/company/settings/index'
import { Route as CompanyHrmIndexImport } from './routes/company/hrm/index'
import { Route as CompanyErmIndexImport } from './routes/company/erm/index'
import { Route as CompanyAddressBookIndexImport } from './routes/company/addressBook/index'
import { Route as AuthProfileIndexImport } from './routes/auth/profile/index'
import { Route as CompanyUserManagementUserImport } from './routes/company/userManagement/user'
import { Route as AuthVerifyTokenImport } from './routes/auth/verify.$token'
import { Route as AuthResetTokenImport } from './routes/auth/reset.$token'
import { Route as publicDocsSlugImport } from './routes/(public)/docs.$slug'
import { Route as CompanyHrmPositionIndexImport } from './routes/company/hrm/position/index'
import { Route as CompanyHrmEmployeeIndexImport } from './routes/company/hrm/employee/index'
import { Route as CompanyHrmDepartmentIndexImport } from './routes/company/hrm/department/index'

// Create/Update Routes

const CompanyIndexRoute = CompanyIndexImport.update({
  id: '/company/',
  path: '/company/',
  getParentRoute: () => rootRoute,
} as any)

const publicIndexRoute = publicIndexImport.update({
  id: '/(public)/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const publicPricingRoute = publicPricingImport.update({
  id: '/(public)/pricing',
  path: '/pricing',
  getParentRoute: () => rootRoute,
} as any)

const CompanySettingsIndexRoute = CompanySettingsIndexImport.update({
  id: '/company/settings/',
  path: '/company/settings/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyHrmIndexRoute = CompanyHrmIndexImport.update({
  id: '/company/hrm/',
  path: '/company/hrm/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyErmIndexRoute = CompanyErmIndexImport.update({
  id: '/company/erm/',
  path: '/company/erm/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyAddressBookIndexRoute = CompanyAddressBookIndexImport.update({
  id: '/company/addressBook/',
  path: '/company/addressBook/',
  getParentRoute: () => rootRoute,
} as any)

const AuthProfileIndexRoute = AuthProfileIndexImport.update({
  id: '/auth/profile/',
  path: '/auth/profile/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyUserManagementUserRoute = CompanyUserManagementUserImport.update({
  id: '/company/userManagement/user',
  path: '/company/userManagement/user',
  getParentRoute: () => rootRoute,
} as any)

const AuthVerifyTokenRoute = AuthVerifyTokenImport.update({
  id: '/auth/verify/$token',
  path: '/auth/verify/$token',
  getParentRoute: () => rootRoute,
} as any)

const AuthResetTokenRoute = AuthResetTokenImport.update({
  id: '/auth/reset/$token',
  path: '/auth/reset/$token',
  getParentRoute: () => rootRoute,
} as any)

const publicDocsSlugRoute = publicDocsSlugImport.update({
  id: '/(public)/docs/$slug',
  path: '/docs/$slug',
  getParentRoute: () => rootRoute,
} as any)

const CompanyHrmPositionIndexRoute = CompanyHrmPositionIndexImport.update({
  id: '/company/hrm/position/',
  path: '/company/hrm/position/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyHrmEmployeeIndexRoute = CompanyHrmEmployeeIndexImport.update({
  id: '/company/hrm/employee/',
  path: '/company/hrm/employee/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyHrmDepartmentIndexRoute = CompanyHrmDepartmentIndexImport.update({
  id: '/company/hrm/department/',
  path: '/company/hrm/department/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(public)/pricing': {
      id: '/(public)/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof publicPricingImport
      parentRoute: typeof rootRoute
    }
    '/(public)/': {
      id: '/(public)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof publicIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/': {
      id: '/company/'
      path: '/company'
      fullPath: '/company'
      preLoaderRoute: typeof CompanyIndexImport
      parentRoute: typeof rootRoute
    }
    '/(public)/docs/$slug': {
      id: '/(public)/docs/$slug'
      path: '/docs/$slug'
      fullPath: '/docs/$slug'
      preLoaderRoute: typeof publicDocsSlugImport
      parentRoute: typeof rootRoute
    }
    '/auth/reset/$token': {
      id: '/auth/reset/$token'
      path: '/auth/reset/$token'
      fullPath: '/auth/reset/$token'
      preLoaderRoute: typeof AuthResetTokenImport
      parentRoute: typeof rootRoute
    }
    '/auth/verify/$token': {
      id: '/auth/verify/$token'
      path: '/auth/verify/$token'
      fullPath: '/auth/verify/$token'
      preLoaderRoute: typeof AuthVerifyTokenImport
      parentRoute: typeof rootRoute
    }
    '/company/userManagement/user': {
      id: '/company/userManagement/user'
      path: '/company/userManagement/user'
      fullPath: '/company/userManagement/user'
      preLoaderRoute: typeof CompanyUserManagementUserImport
      parentRoute: typeof rootRoute
    }
    '/auth/profile/': {
      id: '/auth/profile/'
      path: '/auth/profile'
      fullPath: '/auth/profile'
      preLoaderRoute: typeof AuthProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/addressBook/': {
      id: '/company/addressBook/'
      path: '/company/addressBook'
      fullPath: '/company/addressBook'
      preLoaderRoute: typeof CompanyAddressBookIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/erm/': {
      id: '/company/erm/'
      path: '/company/erm'
      fullPath: '/company/erm'
      preLoaderRoute: typeof CompanyErmIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/hrm/': {
      id: '/company/hrm/'
      path: '/company/hrm'
      fullPath: '/company/hrm'
      preLoaderRoute: typeof CompanyHrmIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/settings/': {
      id: '/company/settings/'
      path: '/company/settings'
      fullPath: '/company/settings'
      preLoaderRoute: typeof CompanySettingsIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/hrm/department/': {
      id: '/company/hrm/department/'
      path: '/company/hrm/department'
      fullPath: '/company/hrm/department'
      preLoaderRoute: typeof CompanyHrmDepartmentIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/hrm/employee/': {
      id: '/company/hrm/employee/'
      path: '/company/hrm/employee'
      fullPath: '/company/hrm/employee'
      preLoaderRoute: typeof CompanyHrmEmployeeIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/hrm/position/': {
      id: '/company/hrm/position/'
      path: '/company/hrm/position'
      fullPath: '/company/hrm/position'
      preLoaderRoute: typeof CompanyHrmPositionIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/pricing': typeof publicPricingRoute
  '/': typeof publicIndexRoute
  '/company': typeof CompanyIndexRoute
  '/docs/$slug': typeof publicDocsSlugRoute
  '/auth/reset/$token': typeof AuthResetTokenRoute
  '/auth/verify/$token': typeof AuthVerifyTokenRoute
  '/company/userManagement/user': typeof CompanyUserManagementUserRoute
  '/auth/profile': typeof AuthProfileIndexRoute
  '/company/addressBook': typeof CompanyAddressBookIndexRoute
  '/company/erm': typeof CompanyErmIndexRoute
  '/company/hrm': typeof CompanyHrmIndexRoute
  '/company/settings': typeof CompanySettingsIndexRoute
  '/company/hrm/department': typeof CompanyHrmDepartmentIndexRoute
  '/company/hrm/employee': typeof CompanyHrmEmployeeIndexRoute
  '/company/hrm/position': typeof CompanyHrmPositionIndexRoute
}

export interface FileRoutesByTo {
  '/pricing': typeof publicPricingRoute
  '/': typeof publicIndexRoute
  '/company': typeof CompanyIndexRoute
  '/docs/$slug': typeof publicDocsSlugRoute
  '/auth/reset/$token': typeof AuthResetTokenRoute
  '/auth/verify/$token': typeof AuthVerifyTokenRoute
  '/company/userManagement/user': typeof CompanyUserManagementUserRoute
  '/auth/profile': typeof AuthProfileIndexRoute
  '/company/addressBook': typeof CompanyAddressBookIndexRoute
  '/company/erm': typeof CompanyErmIndexRoute
  '/company/hrm': typeof CompanyHrmIndexRoute
  '/company/settings': typeof CompanySettingsIndexRoute
  '/company/hrm/department': typeof CompanyHrmDepartmentIndexRoute
  '/company/hrm/employee': typeof CompanyHrmEmployeeIndexRoute
  '/company/hrm/position': typeof CompanyHrmPositionIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(public)/pricing': typeof publicPricingRoute
  '/(public)/': typeof publicIndexRoute
  '/company/': typeof CompanyIndexRoute
  '/(public)/docs/$slug': typeof publicDocsSlugRoute
  '/auth/reset/$token': typeof AuthResetTokenRoute
  '/auth/verify/$token': typeof AuthVerifyTokenRoute
  '/company/userManagement/user': typeof CompanyUserManagementUserRoute
  '/auth/profile/': typeof AuthProfileIndexRoute
  '/company/addressBook/': typeof CompanyAddressBookIndexRoute
  '/company/erm/': typeof CompanyErmIndexRoute
  '/company/hrm/': typeof CompanyHrmIndexRoute
  '/company/settings/': typeof CompanySettingsIndexRoute
  '/company/hrm/department/': typeof CompanyHrmDepartmentIndexRoute
  '/company/hrm/employee/': typeof CompanyHrmEmployeeIndexRoute
  '/company/hrm/position/': typeof CompanyHrmPositionIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/pricing'
    | '/'
    | '/company'
    | '/docs/$slug'
    | '/auth/reset/$token'
    | '/auth/verify/$token'
    | '/company/userManagement/user'
    | '/auth/profile'
    | '/company/addressBook'
    | '/company/erm'
    | '/company/hrm'
    | '/company/settings'
    | '/company/hrm/department'
    | '/company/hrm/employee'
    | '/company/hrm/position'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/pricing'
    | '/'
    | '/company'
    | '/docs/$slug'
    | '/auth/reset/$token'
    | '/auth/verify/$token'
    | '/company/userManagement/user'
    | '/auth/profile'
    | '/company/addressBook'
    | '/company/erm'
    | '/company/hrm'
    | '/company/settings'
    | '/company/hrm/department'
    | '/company/hrm/employee'
    | '/company/hrm/position'
  id:
    | '__root__'
    | '/(public)/pricing'
    | '/(public)/'
    | '/company/'
    | '/(public)/docs/$slug'
    | '/auth/reset/$token'
    | '/auth/verify/$token'
    | '/company/userManagement/user'
    | '/auth/profile/'
    | '/company/addressBook/'
    | '/company/erm/'
    | '/company/hrm/'
    | '/company/settings/'
    | '/company/hrm/department/'
    | '/company/hrm/employee/'
    | '/company/hrm/position/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  publicPricingRoute: typeof publicPricingRoute
  publicIndexRoute: typeof publicIndexRoute
  CompanyIndexRoute: typeof CompanyIndexRoute
  publicDocsSlugRoute: typeof publicDocsSlugRoute
  AuthResetTokenRoute: typeof AuthResetTokenRoute
  AuthVerifyTokenRoute: typeof AuthVerifyTokenRoute
  CompanyUserManagementUserRoute: typeof CompanyUserManagementUserRoute
  AuthProfileIndexRoute: typeof AuthProfileIndexRoute
  CompanyAddressBookIndexRoute: typeof CompanyAddressBookIndexRoute
  CompanyErmIndexRoute: typeof CompanyErmIndexRoute
  CompanyHrmIndexRoute: typeof CompanyHrmIndexRoute
  CompanySettingsIndexRoute: typeof CompanySettingsIndexRoute
  CompanyHrmDepartmentIndexRoute: typeof CompanyHrmDepartmentIndexRoute
  CompanyHrmEmployeeIndexRoute: typeof CompanyHrmEmployeeIndexRoute
  CompanyHrmPositionIndexRoute: typeof CompanyHrmPositionIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  publicPricingRoute: publicPricingRoute,
  publicIndexRoute: publicIndexRoute,
  CompanyIndexRoute: CompanyIndexRoute,
  publicDocsSlugRoute: publicDocsSlugRoute,
  AuthResetTokenRoute: AuthResetTokenRoute,
  AuthVerifyTokenRoute: AuthVerifyTokenRoute,
  CompanyUserManagementUserRoute: CompanyUserManagementUserRoute,
  AuthProfileIndexRoute: AuthProfileIndexRoute,
  CompanyAddressBookIndexRoute: CompanyAddressBookIndexRoute,
  CompanyErmIndexRoute: CompanyErmIndexRoute,
  CompanyHrmIndexRoute: CompanyHrmIndexRoute,
  CompanySettingsIndexRoute: CompanySettingsIndexRoute,
  CompanyHrmDepartmentIndexRoute: CompanyHrmDepartmentIndexRoute,
  CompanyHrmEmployeeIndexRoute: CompanyHrmEmployeeIndexRoute,
  CompanyHrmPositionIndexRoute: CompanyHrmPositionIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(public)/pricing",
        "/(public)/",
        "/company/",
        "/(public)/docs/$slug",
        "/auth/reset/$token",
        "/auth/verify/$token",
        "/company/userManagement/user",
        "/auth/profile/",
        "/company/addressBook/",
        "/company/erm/",
        "/company/hrm/",
        "/company/settings/",
        "/company/hrm/department/",
        "/company/hrm/employee/",
        "/company/hrm/position/"
      ]
    },
    "/(public)/pricing": {
      "filePath": "(public)/pricing.tsx"
    },
    "/(public)/": {
      "filePath": "(public)/index.tsx"
    },
    "/company/": {
      "filePath": "company/index.tsx"
    },
    "/(public)/docs/$slug": {
      "filePath": "(public)/docs.$slug.tsx"
    },
    "/auth/reset/$token": {
      "filePath": "auth/reset.$token.tsx"
    },
    "/auth/verify/$token": {
      "filePath": "auth/verify.$token.tsx"
    },
    "/company/userManagement/user": {
      "filePath": "company/userManagement/user.tsx"
    },
    "/auth/profile/": {
      "filePath": "auth/profile/index.tsx"
    },
    "/company/addressBook/": {
      "filePath": "company/addressBook/index.tsx"
    },
    "/company/erm/": {
      "filePath": "company/erm/index.tsx"
    },
    "/company/hrm/": {
      "filePath": "company/hrm/index.tsx"
    },
    "/company/settings/": {
      "filePath": "company/settings/index.tsx"
    },
    "/company/hrm/department/": {
      "filePath": "company/hrm/department/index.tsx"
    },
    "/company/hrm/employee/": {
      "filePath": "company/hrm/employee/index.tsx"
    },
    "/company/hrm/position/": {
      "filePath": "company/hrm/position/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
