declare namespace ReactNavigation {
  export interface RootParamList extends RootStackParamList {
    Home: NavigationStackProp<any, any>
    CarDetails: NavigationStackProp<any, any>
    Scheduling: NavigationStackProp<any, any>
    SchedulingDetails: NavigationStackProp<any, any>
    SchedulingComplete: NavigationStackProp<any, any>
    MyCars: NavigationStackProp<any, any>
  }
}
