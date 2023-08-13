package codi.backend.global.response;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class ExtendedMultiResponseDto<T> extends MultiResponseDto<T> {
    private final List<Long> favorites;

    public ExtendedMultiResponseDto(List<T> data, Page<T> page, List<Long> favorites) {
        super(data, page);
        this.favorites = favorites;
    }
}
