package cn.edu.com.shou.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
/**
 * Created by ubuntu on 2015/11/2 0002.
 */
@Entity
public class Equipment  extends BaseEntity {

    @Getter @Setter
    public String stationId;  //所属站位

    @Getter
    @Setter
    public String equipTypeId;//所属类型

    @Getter @Setter
    public String equipName;  //仪器名称
    @Getter @Setter
    public String equipDescription;  //仪器简介

    @Getter @Setter
    public String longitude;  //经度
    @Getter @Setter
    public String latitude;//纬度

    @Getter @Setter
    public String location;   //物理位置
    @Getter @Setter
    public String img1;     //视频或图像  （文件夹名编号+仪器名称+描述，如：01自动气象站正面）
    @Getter @Setter
    public String img2;     //视频或图像  （文件夹名编号+仪器名称+描述，如：01自动气象站正面）
    @Getter @Setter
    public String img3;     //视频或图像  （文件夹名编号+仪器名称+描述，如：01自动气象站正面）


    public String getImg1() {
        return img1;
    }

    public void setImg1(String img1) {
        this.img1 = img1;
    }

    public String getImg2() {
        return img2;
    }

    public void setImg2(String img2) {
        this.img2 = img2;
    }

    public String getImg3() {
        return img3;
    }

    public void setImg3(String img3) {
        this.img3 = img3;
    }

    public String getEquipTypeId() {
        return equipTypeId;
    }

    public void setEquipTypeId(String equipTypeId) {
        this.equipTypeId = equipTypeId;
    }

    public String getStationId() {
        return stationId;
    }

    public void setStationId(String stationId) {
        this.stationId = stationId;
    }

    public String getEquipName() {
        return equipName;
    }

    public void setEquipName(String equipName) {
        this.equipName = equipName;
    }

    public String getEquipDescription() {
        return equipDescription;
    }

    public void setEquipDescription(String equipDescription) {
        this.equipDescription = equipDescription;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


}