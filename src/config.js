import axios from 'axios';
import base64 from 'base-64';
import { spotify } from './config/server';

export const TOKEN_REQUEST_API = 'https://accounts.spotify.com/api/token';

export const TOKEN_AUTH = `Basic ${base64.encode(
  spotify.ClientId + ':' + spotify.ClientSecret
)}`;

const BASE_URL = 'https://api.spotify.com/v1/';

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const SEARCH_URL = 'search?query=';
export const CATEGORY_URL = 'browse/categories?country=KR';
