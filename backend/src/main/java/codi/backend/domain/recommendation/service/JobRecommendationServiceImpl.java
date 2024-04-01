package codi.backend.domain.recommendation.service;

import codi.backend.domain.job.repository.JobRepository;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.service.MemberService;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.service.ProfileService;
import codi.backend.domain.recommendation.dto.JobRecommendationDto;
import codi.backend.domain.recommendation.repository.JobRecommendationRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@Service
public class JobRecommendationServiceImpl implements JobRecommendationService {
    private final MemberService memberService;
    private final ProfileService profileService;
    private final JobRecommendationRepository jobRecommendationRepository;

    public JobRecommendationServiceImpl(MemberService memberService, ProfileService profileService, JobRecommendationRepository jobRecommendationRepository) {
        this.memberService = memberService;
        this.profileService = profileService;
        this.jobRecommendationRepository = jobRecommendationRepository;
    }

    // TODO principal에 profileId도 함께 확인 가능하므로 수정해보면 좋을 것 같다.
    @Transactional(readOnly = true)
    @Override
    public JobRecommendationDto.Response recommendJobs(String memberId) {
        if (memberId == null) {
            return JobRecommendationDto.Response.builder().build();
        }

        Member member = memberService.findMember(memberId);
        Profile profile = profileService.findProfile(member.getProfile().getId());
        int age = calculateAge(member.getBirth(), LocalDate.now());

        return jobRecommendationRepository.findTop3JobCategories(profile.getDisability(), profile.getSeverity(), age);
    }

    private int calculateAge(String birthDateString, LocalDate currentDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate birthDate = LocalDate.parse(birthDateString, formatter);
        return Period.between(birthDate, currentDate).getYears();
    }
}
