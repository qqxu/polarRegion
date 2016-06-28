package cn.edu.com.shou.service;


import cn.edu.com.shou.domain.Equipment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by zhengxl on 15/8/11.
 */
public interface EquipmentRepository extends PagingAndSortingRepository <Equipment,Long> {
    public List<Equipment> findAll();

    @Query("select e from Equipment e where e.stationId=:stationId")
    public List<Equipment> getEquipInfoByStationId(@Param("stationId") String stationId);

}
