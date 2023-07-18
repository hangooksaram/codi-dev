package codi.backend.global.pageable;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Custom Pageable")
public class CustomPageable {

    @Schema(description = "페이지 당 표시할 contents의 개수", example = "20")
    public int size;

    @Schema(description = "확인하고 싶은 결과 페이지 번호 (0..N)", example = "0")
    public int page;

    @Schema(description = "오름차순 및 내림차순 정렬 (asc or desc)", example = "desc")
    public String direction;
}
