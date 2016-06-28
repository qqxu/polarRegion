package cn.edu.com.shou.domain;

import com.fasterxml.jackson.databind.deser.Deserializers;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

/**
 * Created by zhengxl on 15/8/12.
 */
@Entity
public class EquipmentType extends BaseEntity{
    @Getter
    @Setter
    public String equipmentTypeName;//科考仪器类型

    public String getEquipmentTypeName() {
        return equipmentTypeName;
    }

    public void setEquipmentTypeName(String equipmentTypeName) {
        this.equipmentTypeName = equipmentTypeName;
    }
}
