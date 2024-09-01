import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { SidebarModule } from 'src/app/layout/sidebar/sidebar.module';
import { IconsModule } from 'src/app/lib/icon/icon.module';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuModule } from 'src/app/lib/menu/menu.module';

@NgModule({
  exports: [LayoutComponent],
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    IconsModule,
    CdkMenuModule,
    MenuModule
  ],
})
export class LayoutModule {}
