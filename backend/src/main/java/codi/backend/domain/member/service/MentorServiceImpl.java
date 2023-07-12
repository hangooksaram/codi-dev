package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.domain.member.repository.MentorRepository;
import codi.backend.domain.member.utils.CustomAuthorityUtils;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class MentorServiceImpl implements MentorService{
    private final MentorRepository mentorRepository;
    private final MemberRepository memberRepository;

    public MentorServiceImpl(MentorRepository mentorRepository, MemberRepository memberRepository) {
        this.mentorRepository = mentorRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    @Override
    public Mentor becomeMentor(String memberId, Mentor mentor) {
        Member member = findMember(memberId);
        mentor.setMember(member);

        // member에 mentor 1:1 연결
        member.setMentor(mentor);

        // 멘토 권한 추가(반드시 위에서 mentor 객체를 연결한 다음 실행되어야 한다.)
        member.setRoles(CustomAuthorityUtils.createRoles(member));

        // mentor DB 저장
        return mentorRepository.save(mentor);
    }

    @Override
    public Mentor findMentor(String memberId) {
        return verifyMentor(memberId);
    }

    private Mentor verifyMentor(String memberId) {
        Member member = findMember(memberId);
        if (!member.getRoles().contains("MENTOR")) {
            throw new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR);
        }
        return member.getMentor();
    }

    private Member findMember(String memberId) {
        return memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional
    @Override
    public Mentor updateMentorInformation(String memberId, Mentor mentor) {
        Mentor findMentor = findMentor(memberId);

        Optional.ofNullable(mentor.getFileUrl())
                .ifPresent(findMentor::setFileUrl);
        Optional.ofNullable(mentor.getJob())
                .ifPresent(findMentor::setJob);
        Optional.ofNullable(mentor.getCareer())
                .ifPresent(findMentor::setCareer);
        Optional.ofNullable(mentor.getCompany())
                .ifPresent(findMentor::setCompany);
        Optional.ofNullable(mentor.getIntroduction())
                .ifPresent(findMentor::setIntroduction);

        return mentorRepository.save(findMentor);
    }

    @Override
    public Page<MentorDto.SearchMentorResponse> getFilteredMentors(String job, Integer career, String disability, String keyword, Pageable pageable) {
        return mentorRepository.search(job, career, disability, keyword, pageable);
    }

    // Specification 구현
//    @Transactional(readOnly = true)
//    @Override
//    public Page<Mentor> getFilteredMentors(String job, String career, String disability, String keyword, Pageable pageable) {
//        Specification<Mentor> spec = Specification
//                .where(MentorSpecs.hasJob(job))
//                .and(MentorSpecs.hasCareer(career))
//                .and(MentorSpecs.hasDisability(disability))
//                .and(MentorSpecs.containsKeyword(keyword));
//
//        return mentorRepository.findAll(spec, PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize()));
//    }

    @Transactional(readOnly = true)
    @Override
    public Page<Mentor> getMentors(Pageable pageable) {
        return mentorRepository.findAll(PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize()));
    }
}
