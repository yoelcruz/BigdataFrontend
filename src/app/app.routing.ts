import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes


import { UploadImageComponent } from './components/upload-image/upload-image.component';

const appRoutes: Routes = [
	{path: '', component: UploadImageComponent},
	{path: '**', component: UploadImageComponent} /* ruta 404 cuando escribimos algo en la url que no existe */
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
