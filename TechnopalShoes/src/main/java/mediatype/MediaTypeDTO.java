package com.laponhcet.mediatype;

import com.mytechnopal.base.DTOBase;

public class MediaTypeDTO extends DTOBase {

	private String name;

	// Constructor
    public MediaTypeDTO() {
        super();
        this.name = "";  
    }

public String getName() {
 return name;
}

public void setName(String name) {
 this.name = name;
}

}

