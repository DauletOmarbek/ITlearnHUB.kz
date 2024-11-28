import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { HomeComponent } from './home/home.component';
import { CourseCatalogComponent } from './course-catalog/course-catalog.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import { LessonManagementComponent } from './lesson-management/lesson-management.component';
import { InteractiveModuleComponent } from './interactive-module/interactive-module.component';
import { CommunicationComponent } from './communication/communication.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Главная страница
  
  
  
  { path: '', redirectTo: '/student-profile', pathMatch: 'full' }, // Redirect по умолчанию
  
  { path: 'student-profile', component: StudentProfileComponent },
  { path: 'catalog', component: CourseCatalogComponent }, // Каталог курсов
  { path: 'course/:id', component: CoursePageComponent }, // Страница курса
  { path: 'student-courses', component: StudentCoursesComponent },
  { path: 'student-course/:id', component: StudentCourseComponent },

  { path: 'teacher-profile', component: TeacherProfileComponent },
  { path: 'teacher/lessons', component: LessonManagementComponent }, // Управление уроками
  { path: 'create-course/:id', component: CreateCourseComponent },
  { path: 'course-management/:id', component: CourseManagementComponent },
  { path: 'teacher/dashboard', component: TeacherDashboardComponent }, // Личный кабинет преподавателя
  
  { path: 'interactive', component: InteractiveModuleComponent }, // Интерактивный модуль
  { path: 'communication', component: CommunicationComponent }, // Коммуникация
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
