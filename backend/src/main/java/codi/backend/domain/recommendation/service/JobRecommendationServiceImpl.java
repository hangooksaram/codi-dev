package codi.backend.domain.recommendation.service;

import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.service.ProfileService;
import codi.backend.domain.recommendation.dto.JobRecommendationDto;
import codi.backend.domain.recommendation.repository.JobRecommendationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobRecommendationServiceImpl implements JobRecommendationService {
    private final ProfileService profileService;
    private final JobRecommendationRepository jobRecommendationRepository;

    public JobRecommendationServiceImpl(ProfileService profileService, JobRecommendationRepository jobRecommendationRepository) {
        this.profileService = profileService;
        this.jobRecommendationRepository = jobRecommendationRepository;
    }

    // TODO principal에 profileId도 함께 확인 가능하므로 수정해보면 좋을 것 같다.
    @Transactional(readOnly = true)
    @Override
    public JobRecommendationDto.JobRecommendationResponse recommendJobs(Long profileId) {
        if (profileId == null) {
            return JobRecommendationDto.JobRecommendationResponse.builder().build();
        }

        Profile profile = profileService.findProfile(profileId);
        List<JobRecommendationDto.JobRecommendationInfo> results = jobRecommendationRepository.findTop3JobCategories(profile.getDisability(), profile.getSeverity());

        return buildJobRecommendationResponse(setRankingNumber(results), profile.getDisability());
    }

    private List<JobRecommendationDto.JobRecommendationInfo> setRankingNumber(List<JobRecommendationDto.JobRecommendationInfo> results) {
        for (int i = 0; i < results.size(); i++) {
            results.get(i).setRanking(i + 1);
        }
        return results;
    }

    private JobRecommendationDto.JobRecommendationResponse buildJobRecommendationResponse(List<JobRecommendationDto.JobRecommendationInfo> results, String disability) {
        return JobRecommendationDto.JobRecommendationResponse.builder()
                .disability(disability)
                .jobRecommendationInfos(results)
                .build();
    }

    // 나이 계산 메서드 - 사용 X
    private int calculateAge(String birthDateString, LocalDate currentDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate birthDate = LocalDate.parse(birthDateString, formatter);
        return Period.between(birthDate, currentDate).getYears();
    }
}
