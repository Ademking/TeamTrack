import { Injectable } from '@angular/core';

type SidebarItem = { title: string, path: string, icon: string };

@Injectable({ providedIn: 'root' })
export class SidebarService {
    
    public usersIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;

    public calendarIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;

    public homeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;

    public missionIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;

    public forumIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;

    public trainingIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"><path _ngcontent-hjg-c27="" d="M12 14l9-5-9-5-9 5 9 5z"></path><path _ngcontent-hjg-c27="" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path _ngcontent-hjg-c27="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>`

    public announcementIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`



    constructor() { }

    public getSidebarItems(): Array<SidebarItem> {


        return [
            {
                title: 'Accueil', path: '/dashboard', icon: this.homeIcon
            },
            {
                title: 'Employés', path: '/dashboard/employees', icon: this.usersIcon
            },
            {
                title: 'Mes demandes', path: '/dashboard/mes-demandes-conge', icon: this.calendarIcon
            },
            {
                title: 'Demander un congé', path: '/dashboard/demande-conge', icon: this.calendarIcon
            },
            {
                title: 'Forum', path: '/dashboard/forum', icon: this.forumIcon
            },
            {
                title: 'Formations', path: '/dashboard/training', icon: this.trainingIcon
            },
        ];
    }



    public getSidebarItemsAdmin(): Array<SidebarItem> {


        return [
            {
                title: 'Dashboard', path: '/dashboard/admin', icon: this.homeIcon
            },
            {
                title: 'Employés', path: '/dashboard/employees', icon: this.usersIcon
            },
            {
                title: 'Congés', path: '/dashboard/leave-management', icon: this.calendarIcon
            },
            // {
            //     title: 'Mes demandes', path: '/dashboard/mes-demandes-conge', icon: this.calendarIcon
            // },
            // {
            //     title: 'Demander un congé', path: '/dashboard/demande-conge', icon: this.calendarIcon
            // },
            {
                title: 'Missions', path: '/dashboard/missions', icon: this.missionIcon
            },
            {
                title: 'Forum', path: '/dashboard/forum', icon: this.forumIcon
            },
            {
                title: 'Formations', path: '/dashboard/training', icon: this.trainingIcon
            },
            {
                title: 'Annonces', path: '/dashboard/announcements', icon: this.announcementIcon
            },

        ];
    }
}