import * as appSettings from '@nativescript/core/application-settings';
import { columnSpanProperty } from '@nativescript/core/ui/layouts/grid-layout';
import { writable, derived, get } from 'svelte/store';
import { client } from "../lib/client";
import { User } from "../models/user";

interface UserResponse {
    data: User;
}

function buildUserTokenStore() {
    const stored_token = appSettings.getString('user_token', null);
    const user_token = writable(stored_token);
    return {
        subscribe: user_token.subscribe,
        set(value: string){
            if(value){
                appSettings.setString('user_token', value);
            } else {
                appSettings.remove('user_token');
            }
            user_token.set(value);
        }
    }
}

function buildUserProfileStore() {
    const user_profile = writable(null)
    return {
        subscribe: user_profile.subscribe,
        set(value: any){
            user_profile.set(value);
        }
    }
}

export function login(username:string, password:string):Promise<User> {
    console.log(username);
    console.log(password);

    let stringData = {
        "username": username,
        "password": password,
    };
    let urlencoded = "";
    for (let prop in stringData) {
        if(urlencoded) {
            urlencoded += "&";
        } 
        urlencoded += prop + "=" + stringData[prop];
    }

    return client.sendRequest<UserResponse>('/users/login', 'POST', null, urlencoded).then(response => {
        let data = response.data;
        user_token.set(data.token);
        user_profile.set(data);
        return data;
    })
}

export function logout() {
    user_profile.set(null);
    user_token.set(null);
}

export const user_token = buildUserTokenStore();
export const user_profile = buildUserProfileStore();
