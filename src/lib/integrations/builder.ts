/**
 * Builder.io CMS Initialization
 */
import { builder } from '@builder.io/react';

const BUILDER_PUBLIC_API_KEY = import.meta.env.VITE_BUILDER_PUBLIC_KEY || 'YOUR_BUILDER_PUBLIC_KEY';

builder.init(BUILDER_PUBLIC_API_KEY);

export default builder;
