import { CollectionConfig } from 'payload/types'

import { NextResponse } from 'next/server'

const getStaticTranslation = (langCode: string | undefined, keyPath: string): string => {
  if (!langCode) langCode = 'en'
  try {
    //const translations = require(`../../../locales/${langCode}.json`)
    const nestedTranslation = 'de'
    if (typeof nestedTranslation === 'string') {
      return nestedTranslation
    } else {
      return keyPath
    }
  } catch (error) {
    console.error(`Error loading translations for language code ${langCode}:`, error)
    return keyPath
  }
}

export const collection2: CollectionConfig = {
  endpoints: [
    {
      path: '/register',
      method: 'post',
      handler: async (req) => {
        return NextResponse.json({ error: 'hi' }, { status: 500 })
      },
    },
  ],
  slug: 'endUsers2',
  auth: {
    verify: {
      generateEmailSubject: () => 'Mail subject test',
      generateEmailHTML: ({ token }) => 'Mail html test ${token}',
    },
    forgotPassword: {
      generateEmailSubject: () => 'Mail subject test',
      generateEmailHTML: (token) => 'Mail html test ${token}',
    },
    tokenExpiration: 14400,
  },
  admin: {
    useAsTitle: 'email',
    group: {
      en: getStaticTranslation('en', 'Admin.Groups.EndUser'),
      hu: getStaticTranslation('hu', 'Admin.Groups.EndUser'),
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
    },
  ],
}
