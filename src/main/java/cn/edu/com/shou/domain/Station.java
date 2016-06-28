package cn.edu.com.shou.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

/**
 * Created by zhengxl on 15/8/10.
 */
@Entity
public class Station extends BaseEntity{
    @Getter @Setter
    public String stationName;//站位名称

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }
}
