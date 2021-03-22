import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Output() public outer = new EventEmitter<any>();
 
  public timer:any;
  public tab:any = 'tab1';
  public user:any={
    username:'',//'b123456',
    password:''//123456',
  }  
  public userPhone:any={
    username:'',//'b123456',
    password:''//123456', 
  } 
  public timelimit:any=60;
  public flag:any = true; 
  constructor( public ref : ChangeDetectorRef,public navCtrl: NavController,public router:Router ) { }

  ngOnInit() {
    
   
  }
  //不能再onInit里面初始化  因为img实在ngif判断后加入页面的
  ngAfterViewInit(){
    

  }


  register(){
    this.outer.emit(2);
  }
  forgetPass()
  {
    this.outer.emit(3);
  }
  //登录
  public wrongMsg:any;
  public logUser:any;
  login(){ 
    console.log(this.tab)
    
    if(this.tab=='tab2'){
      this.logUser=this.userPhone
    }
    if(this.tab=='tab1'){
      this.logUser=this.user;
    }
    //this.navCtrl.navigateForward('course');
    // console.log(this.router);
    this.router.navigateByUrl('/course');
  }
 

 
  //清空数据
  clear(){
    this.user.phone='';
    this.user.password='';
    this.user.checkCode='';
    this.timelimit=60;
    this.flag=true;
    clearInterval(this.timer);
  }

}
