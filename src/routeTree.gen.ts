/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpImport } from './routes/sign-up'
import { Route as DashboardRouteImport } from './routes/dashboard/route'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRouteRoute = DashboardRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardRouteImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteRouteChildren {
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardRouteRouteChildren: DashboardRouteRouteChildren = {
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardRouteRouteWithChildren = DashboardRouteRoute._addFileChildren(
  DashboardRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '/sign-up': typeof SignUpRoute
  '/dashboard/': typeof DashboardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/sign-up': typeof SignUpRoute
  '/dashboard': typeof DashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '/sign-up': typeof SignUpRoute
  '/dashboard/': typeof DashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/dashboard' | '/sign-up' | '/dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/sign-up' | '/dashboard'
  id: '__root__' | '/' | '/dashboard' | '/sign-up' | '/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRouteRoute: typeof DashboardRouteRouteWithChildren
  SignUpRoute: typeof SignUpRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRouteRoute: DashboardRouteRouteWithChildren,
  SignUpRoute: SignUpRoute,
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
        "/",
        "/dashboard",
        "/sign-up"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard/route.tsx",
      "children": [
        "/dashboard/"
      ]
    },
    "/sign-up": {
      "filePath": "sign-up.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
