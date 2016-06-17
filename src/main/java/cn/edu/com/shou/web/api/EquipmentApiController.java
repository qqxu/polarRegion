package cn.edu.com.shou.web.api;

import cn.edu.com.shou.domain.Equipment;
import cn.edu.com.shou.service.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import  java.io.*;
/**
 * Created by zhengxl on 15/8/11.
 */
@RestController
@RequestMapping(value = "/api/equipment")
public class EquipmentApiController {
    @Autowired
    EquipmentRepository equipmentRepository;
    @RequestMapping(value = "/getEquipment/{stationId}",method = RequestMethod.GET)
    public List<Equipment> getEquipment(@PathVariable String stationId){
        List<Equipment> equipmentList=equipmentRepository.getEquipInfoByStationId(stationId);
        //读取文件下下面的所有文件
        // List<Equipment>  equipments = new ArrayList<Equipment>();
    /*    String path=null;
       for(int i = 0;i<=equipmentList.size();i++) {
           //   String img2 = img.concat(a);
           path= equipmentList.get(i).img ;
       }*/
        return equipmentList;
    }
    public static  File[] getFiles(String filePath){
        File file = new File(filePath);
        File[] array = file.listFiles();
        return array;
    }
}
