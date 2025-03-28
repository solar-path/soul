/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as publicIndexImport } from './routes/(public)/index'
import { Route as CompanyDashboardImport } from './routes/company/dashboard'
import { Route as AuthProfileImport } from './routes/auth/profile'
import { Route as publicPricingImport } from './routes/(public)/pricing'
import { Route as publicDocsIndexImport } from './routes/(public)/docs/index'
import { Route as CompanyUserManagementUserImport } from './routes/company/userManagement/user'
import { Route as CompanySettingsSettingsImport } from './routes/company/settings/settings'
import { Route as CompanyHrmHrmImport } from './routes/company/hrm/hrm'
import { Route as CompanyErmErmImport } from './routes/company/erm/erm'
import { Route as CompanyAddressBookAddressBookImport } from './routes/company/addressBook/addressBook'
import { Route as CompanyHrmPositionPositionImport } from './routes/company/hrm/position/position'
import { Route as CompanyHrmEmployeeEmployeeImport } from './routes/company/hrm/employee/employee'
import { Route as CompanyHrmDepartmentDepartmentImport } from './routes/company/hrm/department/department'
import { Route as publicDocsTermsPostImport } from './routes/(public)/docs/terms.post'
import { Route as publicDocsPrivacyPostImport } from './routes/(public)/docs/privacy.post'

// Create/Update Routes

const publicIndexRoute = publicIndexImport.update({
  id: '/(public)/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyDashboardRoute = CompanyDashboardImport.update({
  id: '/company/dashboard',
  path: '/company/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthProfileRoute = AuthProfileImport.update({
  id: '/auth/profile',
  path: '/auth/profile',
  getParentRoute: () => rootRoute,
} as any)

const publicPricingRoute = publicPricingImport.update({
  id: '/(public)/pricing',
  path: '/pricing',
  getParentRoute: () => rootRoute,
} as any)

const publicDocsIndexRoute = publicDocsIndexImport.update({
  id: '/(public)/docs/',
  path: '/docs/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyUserManagementUserRoute = CompanyUserManagementUserImport.update({
  id: '/company/userManagement/user',
  path: '/company/userManagement/user',
  getParentRoute: () => rootRoute,
} as any)

const CompanySettingsSettingsRoute = CompanySettingsSettingsImport.update({
  id: '/company/settings/settings',
  path: '/company/settings/settings',
  getParentRoute: () => rootRoute,
} as any)

const CompanyHrmHrmRoute = CompanyHrmHrmImport.update({
  id: '/company/hrm/hrm',
  path: '/company/hrm/hrm',
  getParentRoute: () => rootRoute,
} as any)

const CompanyErmErmRoute = CompanyErmErmImport.update({
  id: '/company/erm/erm',
  path: '/company/erm/erm',
  getParentRoute: () => rootRoute,
} as any)

const CompanyAddressBookAddressBookRoute =
  CompanyAddressBookAddressBookImport.update({
    id: '/company/addressBook/addressBook',
    path: '/company/addressBook/addressBook',
    getParentRoute: () => rootRoute,
  } as any)

const CompanyHrmPositionPositionRoute = CompanyHrmPositionPositionImport.update(
  {
    id: '/company/hrm/position/position',
    path: '/company/hrm/position/position',
    getParentRoute: () => rootRoute,
  } as any,
)

const CompanyHrmEmployeeEmployeeRoute = CompanyHrmEmployeeEmployeeImport.update(
  {
    id: '/company/hrm/employee/employee',
    path: '/company/hrm/employee/employee',
    getParentRoute: () => rootRoute,
  } as any,
)

const CompanyHrmDepartmentDepartmentRoute =
  CompanyHrmDepartmentDepartmentImport.update({
    id: '/company/hrm/department/department',
    path: '/company/hrm/department/department',
    getParentRoute: () => rootRoute,
  } as any)

const publicDocsTermsPostRoute = publicDocsTermsPostImport.update({
  id: '/(public)/docs/terms/post',
  path: '/docs/terms/post',
  getParentRoute: () => rootRoute,
} as any)

const publicDocsPrivacyPostRoute = publicDocsPrivacyPostImport.update({
  id: '/(public)/docs/privacy/post',
  path: '/docs/privacy/post',
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
    '/auth/profile': {
      id: '/auth/profile'
      path: '/auth/profile'
      fullPath: '/auth/profile'
      preLoaderRoute: typeof AuthProfileImport
      parentRoute: typeof rootRoute
    }
    '/company/dashboard': {
      id: '/company/dashboard'
      path: '/company/dashboard'
      fullPath: '/company/dashboard'
      preLoaderRoute: typeof CompanyDashboardImport
      parentRoute: typeof rootRoute
    }
    '/(public)/': {
      id: '/(public)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof publicIndexImport
      parentRoute: typeof rootRoute
    }
    '/company/addressBook/addressBook': {
      id: '/company/addressBook/addressBook'
      path: '/company/addressBook/addressBook'
      fullPath: '/company/addressBook/addressBook'
      preLoaderRoute: typeof CompanyAddressBookAddressBookImport
      parentRoute: typeof rootRoute
    }
    '/company/erm/erm': {
      id: '/company/erm/erm'
      path: '/company/erm/erm'
      fullPath: '/company/erm/erm'
      preLoaderRoute: typeof CompanyErmErmImport
      parentRoute: typeof rootRoute
    }
    '/company/hrm/hrm': {
      id: '/company/hrm/hrm'
      path: '/company/hrm/hrm'
      fullPath: '/company/hrm/hrm'
      preLoaderRoute: typeof CompanyHrmHrmImport
      parentRoute: typeof rootRoute
    }
    '/company/settings/settings': {
      id: '/company/settings/settings'
      path: '/company/settings/settings'
      fullPath: '/company/settings/settings'
      preLoaderRoute: typeof CompanySettingsSettingsImport
      parentRoute: typeof rootRoute
    }
    '/company/userManagement/user': {
      id: '/company/userManagement/user'
      path: '/company/userManagement/user'
      fullPath: '/company/userManagement/user'
      preLoaderRoute: typeof CompanyUserManagementUserImport
      parentRoute: typeof rootRoute
    }
    '/(public)/docs/': {
      id: '/(public)/docs/'
      path: '/docs'
      fullPath: '/docs'
      preLoaderRoute: typeof publicDocsIndexImport
      parentRoute: typeof rootRoute
    }
    '/(public)/docs/privacy/post': {
      id: '/(public)/docs/privacy/post'
      path: '/docs/privacy/post'
      fullPath: '/docs/privacy/post'
      preLoaderRoute: typeof publicDocsPrivacyPostImport
      parentRoute: typeof rootRoute
    }
    '/(public)/docs/terms/post': {
      id: '/(public)/docs/terms/post'
      path: '/docs/terms/post'
      fullPath: '/docs/terms/post'
      preLoaderRoute: typeof publicDocsTermsPostImport
      parentRoute: typeof rootRoute
    }
    '/company/hrm/department/department': {
      id: '/company/hrm/department/department'
      path: '/company/hrm/department/department'
      fullPath: '/company/hrm/department/department'
      preLoaderRoute: typeof CompanyHrmDepartmentDepartmentImport
      parentRoute: typeof rootRoute
    }
    '/company/hrm/employee/employee': {
      id: '/company/hrm/employee/employee'
      path: '/company/hrm/employee/employee'
      fullPath: '/company/hrm/employee/employee'
      preLoaderRoute: typeof CompanyHrmEmployeeEmployeeImport
      parentRoute: typeof rootRoute
    }
    '/company/hrm/position/position': {
      id: '/company/hrm/position/position'
      path: '/company/hrm/position/position'
      fullPath: '/company/hrm/position/position'
      preLoaderRoute: typeof CompanyHrmPositionPositionImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/pricing': typeof publicPricingRoute
  '/auth/profile': typeof AuthProfileRoute
  '/company/dashboard': typeof CompanyDashboardRoute
  '/': typeof publicIndexRoute
  '/company/addressBook/addressBook': typeof CompanyAddressBookAddressBookRoute
  '/company/erm/erm': typeof CompanyErmErmRoute
  '/company/hrm/hrm': typeof CompanyHrmHrmRoute
  '/company/settings/settings': typeof CompanySettingsSettingsRoute
  '/company/userManagement/user': typeof CompanyUserManagementUserRoute
  '/docs': typeof publicDocsIndexRoute
  '/docs/privacy/post': typeof publicDocsPrivacyPostRoute
  '/docs/terms/post': typeof publicDocsTermsPostRoute
  '/company/hrm/department/department': typeof CompanyHrmDepartmentDepartmentRoute
  '/company/hrm/employee/employee': typeof CompanyHrmEmployeeEmployeeRoute
  '/company/hrm/position/position': typeof CompanyHrmPositionPositionRoute
}

export interface FileRoutesByTo {
  '/pricing': typeof publicPricingRoute
  '/auth/profile': typeof AuthProfileRoute
  '/company/dashboard': typeof CompanyDashboardRoute
  '/': typeof publicIndexRoute
  '/company/addressBook/addressBook': typeof CompanyAddressBookAddressBookRoute
  '/company/erm/erm': typeof CompanyErmErmRoute
  '/company/hrm/hrm': typeof CompanyHrmHrmRoute
  '/company/settings/settings': typeof CompanySettingsSettingsRoute
  '/company/userManagement/user': typeof CompanyUserManagementUserRoute
  '/docs': typeof publicDocsIndexRoute
  '/docs/privacy/post': typeof publicDocsPrivacyPostRoute
  '/docs/terms/post': typeof publicDocsTermsPostRoute
  '/company/hrm/department/department': typeof CompanyHrmDepartmentDepartmentRoute
  '/company/hrm/employee/employee': typeof CompanyHrmEmployeeEmployeeRoute
  '/company/hrm/position/position': typeof CompanyHrmPositionPositionRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(public)/pricing': typeof publicPricingRoute
  '/auth/profile': typeof AuthProfileRoute
  '/company/dashboard': typeof CompanyDashboardRoute
  '/(public)/': typeof publicIndexRoute
  '/company/addressBook/addressBook': typeof CompanyAddressBookAddressBookRoute
  '/company/erm/erm': typeof CompanyErmErmRoute
  '/company/hrm/hrm': typeof CompanyHrmHrmRoute
  '/company/settings/settings': typeof CompanySettingsSettingsRoute
  '/company/userManagement/user': typeof CompanyUserManagementUserRoute
  '/(public)/docs/': typeof publicDocsIndexRoute
  '/(public)/docs/privacy/post': typeof publicDocsPrivacyPostRoute
  '/(public)/docs/terms/post': typeof publicDocsTermsPostRoute
  '/company/hrm/department/department': typeof CompanyHrmDepartmentDepartmentRoute
  '/company/hrm/employee/employee': typeof CompanyHrmEmployeeEmployeeRoute
  '/company/hrm/position/position': typeof CompanyHrmPositionPositionRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/pricing'
    | '/auth/profile'
    | '/company/dashboard'
    | '/'
    | '/company/addressBook/addressBook'
    | '/company/erm/erm'
    | '/company/hrm/hrm'
    | '/company/settings/settings'
    | '/company/userManagement/user'
    | '/docs'
    | '/docs/privacy/post'
    | '/docs/terms/post'
    | '/company/hrm/department/department'
    | '/company/hrm/employee/employee'
    | '/company/hrm/position/position'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/pricing'
    | '/auth/profile'
    | '/company/dashboard'
    | '/'
    | '/company/addressBook/addressBook'
    | '/company/erm/erm'
    | '/company/hrm/hrm'
    | '/company/settings/settings'
    | '/company/userManagement/user'
    | '/docs'
    | '/docs/privacy/post'
    | '/docs/terms/post'
    | '/company/hrm/department/department'
    | '/company/hrm/employee/employee'
    | '/company/hrm/position/position'
  id:
    | '__root__'
    | '/(public)/pricing'
    | '/auth/profile'
    | '/company/dashboard'
    | '/(public)/'
    | '/company/addressBook/addressBook'
    | '/company/erm/erm'
    | '/company/hrm/hrm'
    | '/company/settings/settings'
    | '/company/userManagement/user'
    | '/(public)/docs/'
    | '/(public)/docs/privacy/post'
    | '/(public)/docs/terms/post'
    | '/company/hrm/department/department'
    | '/company/hrm/employee/employee'
    | '/company/hrm/position/position'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  publicPricingRoute: typeof publicPricingRoute
  AuthProfileRoute: typeof AuthProfileRoute
  CompanyDashboardRoute: typeof CompanyDashboardRoute
  publicIndexRoute: typeof publicIndexRoute
  CompanyAddressBookAddressBookRoute: typeof CompanyAddressBookAddressBookRoute
  CompanyErmErmRoute: typeof CompanyErmErmRoute
  CompanyHrmHrmRoute: typeof CompanyHrmHrmRoute
  CompanySettingsSettingsRoute: typeof CompanySettingsSettingsRoute
  CompanyUserManagementUserRoute: typeof CompanyUserManagementUserRoute
  publicDocsIndexRoute: typeof publicDocsIndexRoute
  publicDocsPrivacyPostRoute: typeof publicDocsPrivacyPostRoute
  publicDocsTermsPostRoute: typeof publicDocsTermsPostRoute
  CompanyHrmDepartmentDepartmentRoute: typeof CompanyHrmDepartmentDepartmentRoute
  CompanyHrmEmployeeEmployeeRoute: typeof CompanyHrmEmployeeEmployeeRoute
  CompanyHrmPositionPositionRoute: typeof CompanyHrmPositionPositionRoute
}

const rootRouteChildren: RootRouteChildren = {
  publicPricingRoute: publicPricingRoute,
  AuthProfileRoute: AuthProfileRoute,
  CompanyDashboardRoute: CompanyDashboardRoute,
  publicIndexRoute: publicIndexRoute,
  CompanyAddressBookAddressBookRoute: CompanyAddressBookAddressBookRoute,
  CompanyErmErmRoute: CompanyErmErmRoute,
  CompanyHrmHrmRoute: CompanyHrmHrmRoute,
  CompanySettingsSettingsRoute: CompanySettingsSettingsRoute,
  CompanyUserManagementUserRoute: CompanyUserManagementUserRoute,
  publicDocsIndexRoute: publicDocsIndexRoute,
  publicDocsPrivacyPostRoute: publicDocsPrivacyPostRoute,
  publicDocsTermsPostRoute: publicDocsTermsPostRoute,
  CompanyHrmDepartmentDepartmentRoute: CompanyHrmDepartmentDepartmentRoute,
  CompanyHrmEmployeeEmployeeRoute: CompanyHrmEmployeeEmployeeRoute,
  CompanyHrmPositionPositionRoute: CompanyHrmPositionPositionRoute,
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
        "/auth/profile",
        "/company/dashboard",
        "/(public)/",
        "/company/addressBook/addressBook",
        "/company/erm/erm",
        "/company/hrm/hrm",
        "/company/settings/settings",
        "/company/userManagement/user",
        "/(public)/docs/",
        "/(public)/docs/privacy/post",
        "/(public)/docs/terms/post",
        "/company/hrm/department/department",
        "/company/hrm/employee/employee",
        "/company/hrm/position/position"
      ]
    },
    "/(public)/pricing": {
      "filePath": "(public)/pricing.tsx"
    },
    "/auth/profile": {
      "filePath": "auth/profile.tsx"
    },
    "/company/dashboard": {
      "filePath": "company/dashboard.tsx"
    },
    "/(public)/": {
      "filePath": "(public)/index.tsx"
    },
    "/company/addressBook/addressBook": {
      "filePath": "company/addressBook/addressBook.tsx"
    },
    "/company/erm/erm": {
      "filePath": "company/erm/erm.tsx"
    },
    "/company/hrm/hrm": {
      "filePath": "company/hrm/hrm.tsx"
    },
    "/company/settings/settings": {
      "filePath": "company/settings/settings.tsx"
    },
    "/company/userManagement/user": {
      "filePath": "company/userManagement/user.tsx"
    },
    "/(public)/docs/": {
      "filePath": "(public)/docs/index.tsx"
    },
    "/(public)/docs/privacy/post": {
      "filePath": "(public)/docs/privacy.post.tsx"
    },
    "/(public)/docs/terms/post": {
      "filePath": "(public)/docs/terms.post.tsx"
    },
    "/company/hrm/department/department": {
      "filePath": "company/hrm/department/department.tsx"
    },
    "/company/hrm/employee/employee": {
      "filePath": "company/hrm/employee/employee.tsx"
    },
    "/company/hrm/position/position": {
      "filePath": "company/hrm/position/position.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
