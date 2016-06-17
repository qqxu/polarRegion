package cn.edu.com.shou.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by ubuntu on 2015/11/2 0002.
 */

@Controller
@RequestMapping(value="")
public class IndexController {

    //首页
    @RequestMapping(value = "/index")
    public String index(){
        return "index";
    }

    @RequestMapping(value = "/index2")
    public  String getIndex(){
        return "index2";
    }
    //水深成果
    @RequestMapping(value = "/index/Depth")
    public  String Depth(){
        return "Depth";
    }
    //空间重力
    @RequestMapping(value = "/index/Faa")
    public  String Faa(){
        return "Faa";
    }
    //完全布格
    @RequestMapping(value = "/index/FullBg")
    public  String FullBg(){
        return "FullBg";
    }
    //均衡重力
    @RequestMapping(value = "/index/Isostracy")
    public  String Isostracy(){
        return "Isostracy";
    }
    //重力基底
    @RequestMapping(value = "/index/GraBase")
    public  String GraBase(){
        return "GraBase";
    }
    //磁力基底
    @RequestMapping(value = "/index/magBase")
    public  String magBase(){
        return "magBase";
    }
    //磁源重力
    @RequestMapping(value = "/index/magPg")
    public  String magPg(){
        return "magPg";
    }
    //化极磁异常
    @RequestMapping(value = "/index/magRtp")
    public  String magRtp(){
        return "magRtp";
    }
    //莫霍面埋深
    @RequestMapping(value = "/index/moho")
    public  String moho(){
        return "moho";
    }
    //沉积基底
    @RequestMapping(value = "/index/sedBase")
    public  String sedBase(){
        return "sedBase";
    }
    //沉积基底
    @RequestMapping(value = "/index/sedThink")
    public  String sedThink(){
        return "sedThink";
    }
    @RequestMapping(value = "/front")
    public String getGroupTree(Model model)
    {
        return "index";
    }
}
